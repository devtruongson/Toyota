import { DataTypes, Model } from 'sequelize';
import { statusOrder } from '~/utils/enum';
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
            type: DataTypes.STRING,
            allowNull: false,
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        meta_sub_title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        is_show_form: {
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
        price_no_battery: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        price_has_battery: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        display: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        conditioning: {
            // điều hòa
            type: DataTypes.STRING,
            allowNull: true,
        },
        sound: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        usb: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        bluetooth: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        sun_visor: {
            // Guong chan nang
            type: DataTypes.STRING,
            allowNull: true,
        },
        lights: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        brake: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        brake_abs: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        // Phanh dien tu
        ebd: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        // Hệ thống cân bằng điện tử ESC
        esc: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        // Chức năng kiểm soát lực kéo
        tcs: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        // Hỗ trợ khởi hành ngang dốc
        hsa: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        // Chức năng chống lật
        rom: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        // Số lượng túi khí
        air_bag: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        // chìa khóa mã
        key_code: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        note: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: 'Liên Hệ Ngay',
        },
        status: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: statusOrder.PENDING,
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
