import { type Request, type Response } from 'express';
import Medicine from '../models/medicines.model.js';

export const medicinePostController = { createMedicine: async(req: Request, res: Response) => {
    try {
        const {medication_name, medication_description} = req.body;

        const medicineCreate = await Medicine.create({
            name: medication_name,
            code_name: medication_description
        });

        res.status(201).json({message: "The medicine has been successfully created", medicineCreate});
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "An unexpected server error has occurred"});
    }
}}

export const medicineGetController = { getMedicine: async(req: Request, res: Response) => {
    try {
        const medicineArray = await Medicine.findAll()

        res.status(200).json({message: "The medicines have been successfully found", medicineArray});
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "An unexpected server error has occurred"});
    }
}}

export const medicineGetByIdController = { getMedicineById: async(req: Request, res: Response) => {
    try {
        const {id} = req.params;

        if(!id || typeof id !== 'string'){
            return res.status(400).json({message: "Invalid id"});
        }

        const medicine = await Medicine.findByPk(id);

        if(!medicine){
            return res.status(404).json({message: "Medicine not found"})
        }

        res.status(200).json({message: "Medicine found successfully", medicine})
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "An unexpected server error has occurred"});
    }
}}

export const medicinePutController = { putMedicine: async(req: Request, res: Response) => {
    try {
        const {id} = req.params;
        
        if(!id || typeof id !== 'string'){
            return res.status(400).json({message: "Invalid id"});
        }

        const {medication_name, medication_description} = req.body;

        const medicine = await Medicine.findByPk(id);

        if(!medicine){
            return res.status(404).json({message: "Medicine not found"});
        }

        await medicine.update({name: medication_name, code_name: medication_description});

        res.status(200).json({message: "Medicine updated successfully", medicine})
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "An unexpected server error has occurred"});
    }
}}

export const medicineDeleteController = { deleteMedicine: async(req: Request, res: Response) => {
    try {
        const {id} = req.params;

        if(!id || typeof id !== 'string'){
            return res.status(400).json({message: "Invalid id"});
        }

        const deletedMedicine = await Medicine.findByPk(id);

        if(!deletedMedicine){
            return res.status(404).json({message: "Medicine not found"});
        }

        await deletedMedicine.destroy();

        res.status(200).json({message: "Medicine deleted successfully"});
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "An unexpected server error has occurred"});
    }
}}