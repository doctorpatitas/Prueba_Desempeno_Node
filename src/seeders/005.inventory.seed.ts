import inventory from '../models/inventory.model.js';
import { seedWarehouse } from './004.warehouse.seed.js';
import { seedMedicines } from './003.medicines.seed.js';

export async function seedInventory() {
    const warehouseId = await seedWarehouse();
    const medicineId = await seedMedicines();

    const [inventoryItem] = await inventory.findOrCreate({
        where: { inventory_name: 'Inventario Riwi' },
        defaults: {
            warehouse_id: warehouseId.id,
            medication_id: medicineId.id
        }
    });

    return inventoryItem;
}