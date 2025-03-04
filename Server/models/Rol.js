import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Rol = sequelize.define('Rol', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    timestamps: false,
});

export default Rol;
