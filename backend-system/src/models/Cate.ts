import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../configs/connectDB';

class Cate extends Model {}
Cate.init(
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
    },
    {
        sequelize,
        modelName: 'Cate',
    },
);

export default Cate;
