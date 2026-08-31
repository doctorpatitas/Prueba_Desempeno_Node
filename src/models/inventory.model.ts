import { DataTypes, Model } from 'sequelize';
import db from '../config/db.js';

class Inventory extends Model {
    declare id: number;
    declare warehouse_id: number;
    declare medication_id: number;
}

Inventory.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    warehouse_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    medication_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
},{
    sequelize: db,
    timestamps: true,
    paranoid: true
});

export default Inventory;