import express from 'express';
import 'dotenv/config';
import db from './config/db.js';

const {PORT} = process.env;

const app = express();
app.use(express.json());

async function startServer() {
    try {
        await db.authenticate();
        console.log("DB Online");

        await db.sync();
        console.log("DB Synced");
    } catch (error) {
        console.log("Unexpected data base error", error);
    }

    app.listen(PORT, () => {
        console.log("Server running in port", PORT);
    });
}

startServer();