import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../configs/connectDB';

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
            defaultValue: true,
        },
    },
    {
        sequelize,
        modelName: 'FormRegister',
    },
);

export default FormRegister;
