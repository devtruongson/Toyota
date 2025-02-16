import express, { Express } from 'express';
import CarController from '~/controllers/CarController';
import { handleCheckTokenAdmin } from '~/middleware/jwtActions';

const router = express.Router();

const initApiCar = (app: Express) => {
    router.get('/get-by-model', CarController.handleGetCarByModel);
    router.post('/', handleCheckTokenAdmin, CarController.handleCreateCar);
    router.put('/', handleCheckTokenAdmin, CarController.handleUpdateCar);
    router.patch('/', handleCheckTokenAdmin, CarController.handleUpdateVisible);
    router.patch('/status-image', handleCheckTokenAdmin, CarController.handleUpdateVisibleStatusImage);
    router.delete('/image/:id', handleCheckTokenAdmin, CarController.handleDeleteImageCar);
    router.get('/', CarController.handleGetAllCar);
    router.get('/:id', CarController.handleGetDetailCar);
    return app.use('/v1/car', router);
};

export default initApiCar;
