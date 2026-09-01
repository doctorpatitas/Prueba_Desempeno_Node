import { type Request, type Response } from 'express';
import Hospital from '../models/hospital.model.js';

export const hospitalPostController = { createHospital: async(req: Request, res: Response) => {
    try {
        const {hospital_nit, hospital_name, manager, warehouse_id} = req.body;

        const hospitalCreate = await Hospital.create({
            hospital_nit,
            hospital_name,
            manager,
            warehouse_id
        });

        res.status(201).json({message: "The hospital has been successfully created", hospitalCreate});
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "An unexpected server error has occurred"});
    }
}}

export const hospitalGetController = { getHospital: async(req: Request, res: Response) => {
    try {
        const hospitalArray = await Hospital.findAll()

        res.status(200).json({message: "The hospitals have been successfully found", hospitalArray});
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "An unexpected server error has occurred"});
    }
}}

export const hospitalGetByIdController = { getHospitalById: async(req: Request, res: Response) => {
    try {
        const {id} = req.params;

        if(!id || typeof id !== 'string'){
            return res.status(400).json({message: "Invalid id"});
        }

        const hospital = await Hospital.findByPk(id);

        if(!hospital){
            return res.status(404).json({message: "Hospital not found"})
        }

        res.status(200).json({message: "Hospital found successfully", hospital})
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "An unexpected server error has occurred"});
    }
}}

export const hospitalPutController = { putHospital: async(req: Request, res: Response) => {
    try {
        const {id} = req.params;
        
        if(!id || typeof id !== 'string'){
            return res.status(400).json({message: "Invalid id"});
        }

        const {hospital_nit, hospital_name, manager, warehouse_id} = req.body;

        const hospitalCity = await Hospital.findByPk(id);

        if(!hospitalCity){
            return res.status(404).json({message: "Hospital not found"});
        }

        await hospitalCity.update({hospital_nit, hospital_name, manager, warehouse_id});

        res.status(200).json({message: "Hospital updated successfully", hospitalCity})
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "An unexpected server error has occurred"});
    }
}}

export const hospitalDeleteController = { deleteHospital: async(req: Request, res: Response) => {
    try {
        const {id} = req.params;

        if(!id || typeof id !== 'string'){
            return res.status(400).json({message: "Invalid id"});
        }

        const deletedHospital = await Hospital.findByPk(id);

        if(!deletedHospital){
            return res.status(404).json({message: "Hospital not found"});
        }

        await deletedHospital.destroy();

        res.status(200).json({message: "Hospital deleted successfully"});
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "An unexpected server error has occurred"});
    }
}}