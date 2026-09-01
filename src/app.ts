import express from 'express';
import 'dotenv/config';
import db from './config/db.js';
import authRouter from './routes/auth.route.js';
import hospitalRouter from './routes/hospital.route.js';
import inventoryRouter from './routes/inventory.route.js';
import medicineRouter from './routes/medicine.route.js';
import requestRouter from './routes/request.route.js';
import warehouseRouter from './routes/warehouse.route.js';

const {PORT} = process.env;

const app = express();
app.use(express.json());

app.use('/auth', authRouter);
app.use('/hospital', hospitalRouter);
app.use('/inventory', inventoryRouter);
app.use('/medicine', medicineRouter);
app.use('/request', requestRouter);
app.use('/warehouse', warehouseRouter);

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