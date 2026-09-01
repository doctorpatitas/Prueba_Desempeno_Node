import { type Request, type Response } from 'express';
import Warehouse from '../models/warehouse.model.js';

export const warehousePostController = { createWarehouse: async(req: Request, res: Response) => {
    try {
        const {warehouse_name} = req.body;

        const warehouseCreate = await Warehouse.create({
            warehouse_name
        });

        res.status(201).json({message: "The warehouse has been successfully created", warehouseCreate});
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "An unexpected server error has occurred"});
    }
}}

export const warehouseGetController = { getWarehouse: async(req: Request, res: Response) => {
    try {
        const warehouseArray = await Warehouse.findAll()

        res.status(200).json({message: "The warehouses have been successfully found", warehouseArray});
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "An unexpected server error has occurred"});
    }
}}

export const warehouseGetByIdController = { getWarehouseById: async(req: Request, res: Response) => {
    try {
        const {id} = req.params;

        if(!id || typeof id !== 'string'){
            return res.status(400).json({message: "Invalid id"});
        }

        const warehouse = await Warehouse.findByPk(id);

        if(!warehouse){
            return res.status(404).json({message: "Warehouse not found"})
        }

        res.status(200).json({message: "Warehouse found successfully", warehouse})
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "An unexpected server error has occurred"});
    }
}}

export const warehousePutController = { putWarehouse: async(req: Request, res: Response) => {
    try {
        const {id} = req.params;
        
        if(!id || typeof id !== 'string'){
            return res.status(400).json({message: "Invalid id"});
        }

        const {warehouse_name} = req.body;

        const warehouse = await Warehouse.findByPk(id);

        if(!warehouse){
            return res.status(404).json({message: "Warehouse not found"});
        }

        await warehouse.update({warehouse_name});

        res.status(200).json({message: "Warehouse updated successfully", warehouse})
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "An unexpected server error has occurred"});
    }
}}

export const warehouseDeleteController = { deleteWarehouse: async(req: Request, res: Response) => {
    try {
        const {id} = req.params;

        if(!id || typeof id !== 'string'){
            return res.status(400).json({message: "Invalid id"});
        }

        const deletedWarehouse = await Warehouse.findByPk(id);

        if(!deletedWarehouse){
            return res.status(404).json({message: "Warehouse not found"});
        }

        await deletedWarehouse.destroy();

        res.status(200).json({message: "Warehouse deleted successfully"});
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "An unexpected server error has occurred"});
    }
}}