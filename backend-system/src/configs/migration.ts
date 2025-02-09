import Blog from '~/models/Blog';
import Car from '~/models/Car';
import CarFeature from '~/models/CarFeature';
import Cate from '~/models/Cate';
import ChargingStations from '~/models/ChargingStations';
import FormRegister from '~/models/FormRegister';
import Order from '~/models/Order';
import User from '~/models/User';
import { sequelize } from './connectDB';

(async () => {
    try {
        await sequelize.sync(); // Đồng bộ hóa các mô hình với cơ sở dữ liệu
        const modals = [User, Blog, Car, CarFeature, Cate, ChargingStations, FormRegister, Order];
        await Promise.all(modals.map((modal) => modal.sync()));
    } catch (error) {
        console.error('Error creating tables:', error);
    } finally {
        sequelize.close(); // Đóng kết nối sau khi hoàn thành
    }
})();
