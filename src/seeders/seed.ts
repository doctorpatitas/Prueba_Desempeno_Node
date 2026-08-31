import 'dotenv/config';
import db from '../config/db.js';
import '../models/001.relations.model.js';
import { seedRolesAdmin, seedRolesRequestMaganer, seedRolesHospitalMaganer } from './001.roles.seed.js';
import { seedUsersAdmin, seedUsersRequestMaganer, seedUsersHospitalManager } from './002.users.seed.js';
import { seedHospital } from './006.hospital.seed.js';
import { seedWarehouse } from './004.warehouse.seed.js';
import { seedMedicines } from './003.medicines.seed.js';

async function runSeeders() {
    try {
        await db.authenticate();
        console.log("DB Connected. Seeding data...");

        await db.sync({ alter: true });
    
        // Roles seeding
        const adminSeedingRoles = await seedRolesAdmin();
        const requestManagerSeedingRoles = await seedRolesRequestMaganer();
        const hospitalManagerSeedingRoles = await seedRolesHospitalMaganer();

        // Users seeding
        const adminSeedingUsers = await seedUsersAdmin();
        const requestManagerSeedingUsers = await seedUsersRequestMaganer();
        const hospitalManagerSeedingUsers = await seedUsersHospitalManager();

        // Medications seeding
        const medicinesSeeding = await seedMedicines();

        // Warehouse seeding
        const warehouseSeeding = await seedWarehouse();

        // Hospital seeding
        const hospitalSeeding = await seedHospital();

        console.log("Seed completed successfully.");
    } catch (error){
        console.log("Unexpected error during seeding:", error);
    } finally {
        await db.close();
    }
}

runSeeders();