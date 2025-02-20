import express, { Express } from 'express';
import FormRegisterController from '~/controllers/FormRegisterController';
import { handleCheckTokenAdmin, handleCheckTokenUser } from '~/middleware/jwtActions';

const router = express.Router();

const initApiFormRegister = (app: Express) => {
    router.post('/register', handleCheckTokenUser, FormRegisterController.handleRegisterForm);
    router.get('/list', handleCheckTokenAdmin, FormRegisterController.handleGetAllForm);
    router.patch('/change-status', handleCheckTokenAdmin, FormRegisterController.handleUpdateStatus);
    router.post('/send-email', handleCheckTokenAdmin, FormRegisterController.handleSendEmail);
    router.post('/send-email-all', handleCheckTokenAdmin, FormRegisterController.handleSendEmailAll);
    return app.use('/v1/form', router);
};

export default initApiFormRegister;
