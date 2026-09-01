import { DataTypes, Model } from 'sequelize';
import db from '../config/db.js';

class Medicines extends Model {
    declare id: number;
    declare medication_name: string;
    declare medication_description: string;
}

Medicines.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    medication_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    medication_description: {
        type: DataTypes.STRING,
        allowNull: false
    }
},{
    sequelize: db,
    timestamps: true,
    paranoid: true
});

export default Medicines;