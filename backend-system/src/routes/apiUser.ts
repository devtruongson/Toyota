import express, { Express } from 'express';
import userController from '~/controllers/UserController';
import { handleCheckTokenAdmin } from '~/middleware/jwtActions';

const router = express.Router();

const initApiUser = (app: Express) => {
    router.post('/register', userController.handleCreateUser);
    router.post('/login', userController.handleLogin);
    router.get('/all', handleCheckTokenAdmin, userController.getAllUsers);
    router.get('/search', handleCheckTokenAdmin, userController.handleSearch);
    router.get('/:id', handleCheckTokenAdmin, userController.getOneUser);
    return app.use('/v1/user', router);
};

export default initApiUser;
