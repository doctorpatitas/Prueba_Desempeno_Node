import { DataTypes, Model } from 'sequelize';
import db from '../config/db.js';

class Users extends Model {
    declare id: number;
    declare first_name: string;
    declare last_name: string
    declare email: string;
    declare password: string;
    declare birth_date: string;
    declare document_number: number;
    declare document_type: 'CC'|'CE'|'TI';
    declare rol_id: number;
}

Users.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    first_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    last_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    birth_date: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    document_number: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true
    },
    document_type: {
        type: DataTypes.ENUM('CC', 'CE', 'TI'),
        allowNull: false
    },
    rol_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
},{
    sequelize: db,
    timestamps: true,
    paranoid: true
});

export default Users;