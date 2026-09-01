import { DataTypes, Model } from 'sequelize';
import db from '../config/db.js';

class Roles extends Model {
    declare id: number;
    declare rol_name: 'admin'|'request manager'|'hospital manager';
}

Roles.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    rol_name: {
        type: DataTypes.ENUM('admin', 'request manager', 'hospital manager'),
        allowNull: false
    }
},{
    sequelize: db,
    timestamps: true,
    paranoid: true
});

export default Roles;