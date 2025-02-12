import express, { Express } from 'express';
import ChukController from '~/controllers/ChukController';
import { handleCheckTokenAdmin } from '~/middleware/jwtActions';

const router = express.Router();

const initApiChuk = (app: Express) => {
    router.post('/cate', handleCheckTokenAdmin, ChukController.handleCreateCate);
    router.put('/cate', handleCheckTokenAdmin, ChukController.handleUpdateCate);
    router.patch('/cate', handleCheckTokenAdmin, ChukController.handleUpdateVisibleCate);
    router.get('/cate', ChukController.handleGetAllCate);
    router.get('/cate/:id', ChukController.handleGetOneCate);

    router.post('/blog', handleCheckTokenAdmin, ChukController.handleCreateBlog);
    router.put('/blog', handleCheckTokenAdmin, ChukController.handleUpdateBlog);
    router.patch('/blog', handleCheckTokenAdmin, ChukController.handleUpdateVisibleBlog);
    router.get('/blog', ChukController.handleGetAllBlog);
    router.get('/blog/:id', ChukController.getDetailBlog);
    router.delete('/blog/:id', ChukController.handleDeleteBlog);

    return app.use('/v1/chuk', router);
};

export default initApiChuk;
