import { Sequelize } from 'sequelize';

export const sequelize = new Sequelize('system_manage', 'sa', 'Nson091120@', {
    dialect: 'mssql',
    host: 'localhost',
    logging: false,
});

export default async function connectDB() {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}
