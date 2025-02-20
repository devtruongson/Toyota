import express, { Express } from 'express';
import ChargingController from '~/controllers/ChargingController';

const router = express.Router();

const initApiCharging = (app: Express) => {
    router.get('/', ChargingController.getAllCharging);
    router.post('/', ChargingController.createCharging);
    router.put('/', ChargingController.updateCharging);
    router.delete('/:id', ChargingController.deleteCharging);
    return app.use('/v1/charging', router);
};

export default initApiCharging;
