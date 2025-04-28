"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const pg_1 = require("pg");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
const PgDBURL = process.env.pgUrl;
const pgClient = new pg_1.Client(PgDBURL);
pgClient.connect().then(() => { console.log("Connected to the Postgres DB"); });
app.listen(3000, () => {
    console.log("Server Started at the port 3000");
});
