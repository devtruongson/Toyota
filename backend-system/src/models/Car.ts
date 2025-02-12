import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../configs/connectDB';

class Car extends Model {}
Car.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
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
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
        url_video_demo: {
            type: DataTypes.TEXT('long'),
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
        // Có sẵn hàng hay không
        status: {
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
        is_active: {
            type: DataTypes.BOOLEAN,
            defaultValue: true,
            allowNull: false,
        },
    },
    {
        sequelize,
        modelName: 'Car',
    },
);

export default Car;
