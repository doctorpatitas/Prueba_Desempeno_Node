import { type Request, type Response } from 'express';
import RequestModel from '../models/requests.model.js';
import Inventory from '../models/inventory.model.js';
import db from '../config/db.js';

export const requestPostController = { postRequest: async (req: Request, res: Response) => {
    try {
        const {requested_hospital, medicine, assigned_warehouse, initial_state, requested_quantity} = req.body;

        const requestedCreated = await db.transaction(async (transaction) => {
            const inventory = await Inventory.findOne({
                where: {
                    warehouse_id: assigned_warehouse,
                    medication_id: medicine
                },
                transaction: transaction,
                lock: transaction.LOCK.UPDATE
            });

            if(!inventory) {
                throw new Error("Inventory not found");
            }

            if(inventory.stock_quantity < requested_quantity){
                throw new Error("Insufficient stock")
            }

            await inventory.decrement('stock_quantity', {
                by: requested_quantity,
                transaction: transaction
            });

            const newRequest = await RequestModel.create({
                requested_hospital,
                medicine,
                assigned_warehouse,
                initial_state,
                requested_quantity
            }, { transaction: transaction });

            return newRequest;
        });

        res.status(201).json({message: "Request created successfully", data: requestedCreated});
    } catch (error) {
        if(error instanceof Error && (error.message === "Inventory not found")){
            return res.status(404).json({message: "No inventory record found for the specified warehouse and medicine"});
        }
        if(error instanceof Error && (error.message === "Insufficient stock")){
            return res.status(400).json({message: "Insufficient stock for the requested quantity"});
        }
        console.log("Unexpected error in sever", error);
        res.status(500).json({message: "Unexpected error in server"});
    }
}}

export const requestGetController = { getRequest: async (req: Request, res: Response) => {
    try {
        const requests = await RequestModel.findAll();
        res.status(200).json({message: "Requests retrieved successfully", data: requests});
    } catch (error) {
        console.log("Unexpected error in sever", error);
        res.status(500).json({message: "Unexpected error in server"});
    }
}}