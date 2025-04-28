import express from "express";
import {Client, Query} from "pg";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(express.json());

const PgDBURL = process.env.pgUrl;

const pgClient = new Client(PgDBURL);

pgClient.connect().then(() => {console.log("Connected to the Postgres DB")})

app.listen(3000, () => {
    console.log("Server Started at the port 3000");
})