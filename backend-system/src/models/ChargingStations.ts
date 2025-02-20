import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../configs/connectDB';

class ChargingStations extends Model {}
ChargingStations.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        location: {
            type: DataTypes.TEXT('long'),
            allowNull: false,
        },
        power_kw: {
            type: DataTypes.STRING,
            allowNull: false,
            // defaultValue: true,
        },
    },
    {
        sequelize,
        modelName: 'ChargingStations',
    },
);

export default ChargingStations;
