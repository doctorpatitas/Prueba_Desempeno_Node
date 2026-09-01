import { DataTypes, Model } from 'sequelize';
import db from '../config/db.js';

class Hospital extends Model {
    declare hospital_nit: number;
    declare hospital_name: string;
    declare manager: number;
    declare warehouse_id: number;
}

Hospital.init({
    hospital_nit: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    hospital_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    manager: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true
    },
    warehouse_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true
    }
},{
    sequelize: db,
    timestamps: true,
    paranoid: true
});

export default Hospital;