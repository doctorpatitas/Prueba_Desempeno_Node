import Warehouse from '../models/warehouse.model.js';

export async function seedWarehouse() {
    const [warehouse] = await Warehouse.findOrCreate({
        where: { warehouse_name: 'Bodega Riwi' },
        defaults: {
            warehouse_name: 'Bodega Riwi'
        }
    });

    return warehouse;
}