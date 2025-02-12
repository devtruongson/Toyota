import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../configs/connectDB';
import Cate from './Cate';

class Blog extends Model {}
Blog.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        thumbnail: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        meta_description: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        content: {
            type: DataTypes.TEXT('long'),
            allowNull: false,
        },
        is_active: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true,
        },
        cate_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    },
    {
        sequelize,
        modelName: 'Blog',
    },
);

Cate.hasMany(Blog, {
    foreignKey: 'cate_id',
    as: 'blog_list',
});

Blog.belongsTo(Cate, {
    foreignKey: 'cate_id',
    targetKey: 'id',
    as: 'cate_date',
});

export default Blog;
