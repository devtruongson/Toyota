import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../configs/connectDB';

class User extends Model {}
User.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true,
        },
        first_name: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        last_name: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        role: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: 'user',
        },
        address: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        address_detail: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        phone_number: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        code: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        avatar: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: 'https://fstack.io.vn/wp-content/uploads/2024/09/image.png.webp',
        },
        is_login_social: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
            defaultValue: false,
        },
        age: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        gender: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
        },
    },
    {
        sequelize,
        modelName: 'User',
    },
);

export default User;
