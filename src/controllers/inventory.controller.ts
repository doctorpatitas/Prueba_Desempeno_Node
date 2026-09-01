import { type Request, type Response } from 'express';
import Inventory from '../models/inventory.model.js';

export const inventoryPostController = { createInventory: async(req: Request, res: Response) => {
    try {
        const {warehouse_id, medication_id, stock_quantity} = req.body;

        const inventoryCreate = await Inventory.create({
            warehouse_id,
            medication_id,
            stock_quantity
        });

        res.status(201).json({message: "The inventory has been successfully created", inventoryCreate});
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "An unexpected server error has occurred"});
    }
}}

export const inventoryGetController = { getInventory: async(req: Request, res: Response) => {
    try {
        const inventoryArray = await Inventory.findAll()

        res.status(200).json({message: "The inventories have been successfully found", inventoryArray});
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "An unexpected server error has occurred"});
    }
}}

export const inventoryGetByIdController = { getInventoryById: async(req: Request, res: Response) => {
    try {
        const {id} = req.params;

        if(!id || typeof id !== 'string'){
            return res.status(400).json({message: "Invalid id"});
        }

        const inventory = await Inventory.findByPk(id);

        if(!inventory){
            return res.status(404).json({message: "Inventory not found"})
        }

        res.status(200).json({message: "Inventory found successfully", inventory})
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "An unexpected server error has occurred"});
    }
}}

export const inventoryPutController = { updateInventory: async(req: Request, res: Response) => {
    try {
        const {id} = req.params;
        
        if(!id || typeof id !== 'string'){
            return res.status(400).json({message: "Invalid id"});
        }

        const {warehouse_id, medication_id, stock_quantity} = req.body;

        const inventory = await Inventory.findByPk(id);

        if(!inventory){
            return res.status(404).json({message: "Inventory not found"});
        }

        await inventory.update({warehouse_id, medication_id, stock_quantity});

        res.status(200).json({message: "Inventory updated successfully", inventory})
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "An unexpected server error has occurred"});
    }
}}

export const inventoryDeleteController = { deleteInventory: async(req: Request, res: Response) => {
    try {
        const {id} = req.params;

        if(!id || typeof id !== 'string'){
            return res.status(400).json({message: "Invalid id"});
        }

        const deletedInventory = await Inventory.findByPk(id);

        if(!deletedInventory){
            return res.status(404).json({message: "Inventory not found"});
        }

        await deletedInventory.destroy();

        res.status(200).json({message: "Inventory deleted successfully"});
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "An unexpected server error has occurred"});
    }
}}