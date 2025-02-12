import { Express } from 'express';
import initApiCar from './apiCar';
import initApiChuk from './apiCateAndBlog';
import initApiFormRegister from './apiFormRegister';
import initApiOrder from './apiOrder';
import initApiUpload from './apiUpload';
import initApiUser from './apiUser';

const initApiRoutes = (app: Express) => {
    initApiUser(app);
    initApiFormRegister(app);
    initApiCar(app);
    initApiOrder(app);
    initApiUpload(app);
    initApiChuk(app);
};

export default initApiRoutes;
