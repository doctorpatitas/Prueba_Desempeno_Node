import Hospital from '../models/hospital.model.js';
import { seedUsersHospitalManager } from './002.users.seed.js';
import { seedWarehouse } from './004.warehouse.seed.js';

export async function seedHospital() {
    const managerId = await seedUsersHospitalManager();
    const warehouseId = await seedWarehouse();

    const [hospital] = await Hospital.findOrCreate({
        where: { hospital_nit: 123456789 },
        defaults: {
            hospital_nit: 123456789,
            hospital_name: 'Hospital Riwi',
            manager: managerId.id,
            warehouse_id: warehouseId.id
        }
    });

    return hospital;
}