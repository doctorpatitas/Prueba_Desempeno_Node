import { DataTypes, Model } from 'sequelize';
import db from '../config/db.js';

class Warehouse extends Model {
    declare id: number;
    declare warehouse_name: string;
}

Warehouse.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    warehouse_name: {
        type: DataTypes.STRING,
        allowNull: false
    }
},{
    sequelize: db,
    timestamps: true,
    paranoid: true
});

export default Warehouse;