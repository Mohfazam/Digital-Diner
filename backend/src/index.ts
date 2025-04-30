import express from "express";
import {Client, Query} from "pg";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import jwt from'jsonwebtoken';
import mongoose from "mongoose"
import { MenuItem } from "./models/MongoDB";
import cors from "cors";

dotenv.config();

const app = express();

app.use(express.json());

app.use(cors());

const PgDBURL = process.env.pgUrl;
const JWT_SECRET = process.env.JWT_SECRET;
const MONGO_URL = process.env.MONGO_URL!;

const pgClient = new Client(PgDBURL);
mongoose.connect(MONGO_URL).then(() => {
    console.log("COnnected to the MongoDB");
})
pgClient.connect().then(() => {console.log("Connected to the Postgres DB")});


app.post("/signup", async (req, res) => {
    const { username, email, password, phoneNumber } = req.body;

    try{
        const hashedPassword = await bcrypt.hash(password, 10);

    const result = await pgClient.query(
        `INSERT INTO diner_users (username, email, password_hash, phone_number) VALUES ($1, $2, $3, $4) RETURNING id`, [ username, email, hashedPassword, phoneNumber]
    );

    res.status(200).json({
        message: "User Signed Up",
        username, email, phoneNumber
    })
    } catch(e){
        res.status(400).json({
            Message: "something is very wrong"
        });
    }
});
//@ts-ignore
app.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        // Admin credentials check
        if (email === "Admin@Eatoes.com" && password === "Eatoes@123") {
            const adminToken = jwt.sign(
                { userId: "admin", role: "admin" },
                JWT_SECRET!,
                { expiresIn: '1h' }
            );

            return res.status(200).json({
                msg: "Admin Logged in",
                email,
                token: adminToken,
                role: "admin"
            });
        }

        // Regular user flow
        const user = await pgClient.query(
            `SELECT * FROM diner_users WHERE email = $1`, [email]
        );

        if (!user.rows[0]) {
            return res.status(404).json({
                error: "User Not found"
            });
        }

        const valid = await bcrypt.compare(password, user.rows[0].password_hash);

        if (!valid) {
            return res.status(401).json({
                error: "Invalid Password"
            });
        }

        const token = jwt.sign(
            { userId: user.rows[0].id, role: "user" },
            JWT_SECRET!,
            { expiresIn: '1h' }
        );

        res.status(200).json({
            msg: "User Logged in",
            email,
            token,
            role: "user"
        });

    } catch (error) {
        res.status(500).json({
            error: "Login Failed"
        });
    }
});


app.get("/items", async (req, res) => {
    try{
        const allMenuItems = await MenuItem.find({});

        res.status(200).json({
            msg: "Fetched items successfully",
            items: allMenuItems
        })
    } catch(error){
        res.status(500).json({
            msg: "Failed to fetch menu itme"
        });
    }
});
//@ts-ignore
app.post("/menuItems", async (req, res) => {
    try{
        const {name, category, price, description, image } = req.body;

        if(!name || !category || !price){
            return res.status(200).json({
                Error: "Missing required fields (name, category, price"
            });
        }

        const newItem = new MenuItem({
            name, 
            category,
            price,
            description: description || "Delicious item description coming soon",
            image: image || "https://www.google.com/url?sa=i&url=https%3A%2F%2Fdribbble.com%2Fshots%2F4187820-404-Food-Not-Found&psig=AOvVaw3oXqAA8RhXZ0Nfx6fTNQqc&ust=1746026630776000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCLDa_J_G_YwDFQAAAAAdAAAAABAE"
        });

        const savedItem = await newItem.save();

        res.status(201).json({
            Message: "Menu Items Created Successfully",
            item: savedItem
        });
    } catch(error){
        res.status(500).json({
            success: false,
            error: "Failed to create menu item"
        });
    }
});

//@ts-ignore
app.post("/orders", async (req, res) => {
    try{
        const {phoneNumber, items, totalPrice} = req.body;

        if (!phoneNumber || !items || !totalPrice) {
            return res.status(400).json({ error: "Missing required fields" });
        }

        await pgClient.query("BEGIN");

        const orderResult = await pgClient.query(
            `INSERT INTO orders (phone_number, total_price)
            VALUES ($1, $2) RETURNING id`, 
            [phoneNumber, totalPrice]
        );

        const orderId = orderResult.rows[0].id;

        for (const item of items) {
            await pgClient.query(
                `INSERT INTO order_items (order_id, item_name, price, quantity)
                 VALUES ($1, $2, $3, $4)`,
                [orderId, item.name, item.price, item.quantity]
            );
        }

        await pgClient.query("COMMIT");

        res.status(201).json({
            Message: "Orders Placed Successfully",
            orderId,
            totalPrice
        });

    } catch(error){
        await pgClient.query("ROLLBACK");
        console.error("Order placement error:", error);
        res.status(500).json({ 
            success: false, 
            error: "Order placement failed" 
        });
    }
});

app.get("/orders", async (req, res) => {
    try {
      const result = await pgClient.query(`
        SELECT 
          o.id AS order_id,
          o.phone_number,
          o.total_price,
          o.created_at,
          json_agg(json_build_object(
            'item_name', oi.item_name,
            'price', oi.price,
            'quantity', oi.quantity
          )) AS items
        FROM orders o
        JOIN order_items oi ON o.id = oi.order_id
        GROUP BY o.id
        ORDER BY o.created_at DESC
      `);
  
      res.status(200).json({
        success: true,
        orders: result.rows
      });
  
    } catch (error) {
      console.error("Orders fetch error:", error);
      res.status(500).json({ 
        success: false, 
        error: "Failed to fetch orders" 
      });
    }
  });


app.get("/orders/:phone", async (req, res) => {
    try {
        const phoneNumber = req.params.phone;
        
        const result = await pgClient.query(`
            SELECT 
                o.id AS order_id,
                o.total_price,
                o.created_at,
                json_agg(json_build_object(
                    'item_name', oi.item_name,
                    'price', oi.price,
                    'quantity', oi.quantity
                )) AS items
            FROM orders o
            JOIN order_items oi ON o.id = oi.order_id
            WHERE o.phone_number = $1
            GROUP BY o.id
            ORDER BY o.created_at DESC
        `, [phoneNumber]);

        res.status(200).json({
            success: true,
            orders: result.rows
        });

    } catch (error) {
        console.error("Order history error:", error);
        res.status(500).json({ 
            success: false, 
            error: "Failed to fetch order history" 
        });
    }
});

app.listen(3000, () => {
    console.log("Server Started at the port 3000");
})