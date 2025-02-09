import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../configs/connectDB';
import Car from './Car';

class CarFeature extends Model {}
CarFeature.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        image_url: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        color: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        is_active: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true,
        },
        car_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    },
    {
        sequelize,
        modelName: 'CarFeature',
    },
);

Car.hasMany(CarFeature, {
    foreignKey: 'car_id',
    as: 'car_features',
});

CarFeature.belongsTo(Car, {
    foreignKey: 'car_id',
    targetKey: 'id',
    as: 'car_data',
});

export default CarFeature;
