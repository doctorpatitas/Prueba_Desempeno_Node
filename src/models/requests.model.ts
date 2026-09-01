import { DataTypes, Model } from 'sequelize';
import db from '../config/db.js';

class RequestModel extends Model {
    declare id: number;
    declare requested_hospital: number;
    declare medicine: number;
    declare assigned_warehouse: number;
    declare initial_state: 'pending'|'in progress'|'completed';
    declare requested_quantity: number;
}

RequestModel.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    requested_hospital: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    medicine: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    assigned_warehouse: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    initial_state: {
        type: DataTypes.ENUM('pending', 'in progress', 'completed'),
        allowNull: false
    },
    requested_quantity: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
},{
    sequelize: db,
    timestamps: true,
    paranoid: true
});

export default RequestModel;