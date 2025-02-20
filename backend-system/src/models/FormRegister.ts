import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../configs/connectDB';
import Car from './Car';
import User from './User';

class FormRegister extends Model {}
FormRegister.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        car_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        note: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        time: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        type: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        status: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
        },
    },
    {
        sequelize,
        modelName: 'FormRegister',
    },
);

User.hasMany(FormRegister, {
    foreignKey: 'user_id',
    as: 'form_list',
});

FormRegister.belongsTo(User, {
    foreignKey: 'user_id',
    targetKey: 'id',
    as: 'user_data',
});

Car.hasMany(FormRegister, {
    foreignKey: 'car_id',
    as: 'list_form',
});

FormRegister.belongsTo(Car, {
    foreignKey: 'car_id',
    targetKey: 'id',
    as: 'car_data',
});

export default FormRegister;
