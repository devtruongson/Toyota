import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../configs/connectDB';
import Car from './Car';
import User from './User';

class Order extends Model {}
Order.init(
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
        order_date: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.TEXT('long'),
            allowNull: false,
        },
        weight: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        model: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        battery_capacity: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        range_km: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        price: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        note: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: true,
        },
        status: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: 'pending',
        },
    },
    {
        sequelize,
        modelName: 'Order',
    },
);
User.hasMany(Order, {
    foreignKey: 'user_id',
    as: 'order_list',
});

Order.belongsTo(User, {
    foreignKey: 'user_id',
    targetKey: 'id',
    as: 'user_data',
});

Car.hasMany(Order, {
    foreignKey: 'car_id',
    as: 'car_orders',
});

Order.belongsTo(Car, {
    foreignKey: 'car_id',
    targetKey: 'id',
    as: 'car_data',
});

export default Order;
