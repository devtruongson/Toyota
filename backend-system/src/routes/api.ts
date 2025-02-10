import { Express } from 'express';
import initApiCar from './apiCar';
import initApiFormRegister from './apiFormRegister';
import initApiUser from './apiUser';

const initApiRoutes = (app: Express) => {
    initApiUser(app);
    initApiFormRegister(app);
    initApiCar(app);
};

export default initApiRoutes;
