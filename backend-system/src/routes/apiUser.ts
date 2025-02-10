import express, { Express } from 'express';
import userController from '~/controllers/UserController';
import { handleCheckTokenAdmin, handleCheckTokenUser, handleRefreshToken } from '~/middleware/jwtActions';

const router = express.Router();

const initApiUser = (app: Express) => {
    router.post('/register', userController.handleCreateUser);
    router.post('/login', userController.handleLogin);
    router.get('/all', handleCheckTokenAdmin, userController.getAllUsers);
    router.get('/search', handleCheckTokenAdmin, userController.handleSearch);
    router.post('/refresh-token', handleRefreshToken, userController.handleRefreshToken);
    router.get('/form', handleCheckTokenUser, userController.getAllForm);
    router.get('/:id', handleCheckTokenUser, userController.getOneUser);
    return app.use('/v1/user', router);
};

export default initApiUser;
