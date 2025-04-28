import express from "express";
import {Client, Query} from "pg";
import dotenv from "dotenv";
import bcrypt from "bcrypt";

dotenv.config();

const app = express();
app.use(express.json());

const PgDBURL = process.env.pgUrl;

const pgClient = new Client(PgDBURL);

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
})




app.listen(3000, () => {
    console.log("Server Started at the port 3000");
})