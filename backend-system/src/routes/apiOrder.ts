import express, { Express } from 'express';
import OrderController from '~/controllers/OrderController';
import { handleCheckTokenAdmin, handleCheckTokenUser } from '~/middleware/jwtActions';

const router = express.Router();

const initApiOrder = (app: Express) => {
    router.post('/', handleCheckTokenUser, OrderController.handleCreateOrder);
    router.get('/', handleCheckTokenAdmin, OrderController.handleGetAllOrder);
    router.get('/:id', handleCheckTokenUser, OrderController.handleGetDetailOrder);
    router.get('/user/:id', handleCheckTokenUser, OrderController.handleGetAllOrderUser);
    router.patch('/', handleCheckTokenUser, OrderController.handleUpdateStatusOrder);
    return app.use('/v1/order', router);
};

export default initApiOrder;
