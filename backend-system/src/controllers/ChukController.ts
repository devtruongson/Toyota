import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { CreateBlogDTO } from '~/dtos/CreateBlog.dto';
import { CreateCateDTO } from '~/dtos/CreateCate.dto';
import { UpdateBlogDTO } from '~/dtos/UpdateBlog.dto';
import { VisibleDTO } from '~/dtos/Visible.dto';
import ChukService from '~/services/ChukService';
import { ResponseHandler } from '~/utils/Response';
import { validateData } from '~/utils/validate';

class ChukController {
    async handleCreateCate(req: Request, res: Response) {
        try {
            const isValid = await validateData(CreateCateDTO, req.body, res);
            if (!isValid) return;
            const data = await ChukService.handleCreateCate(req.body);
            return res.status(httpStatus.OK).json(data);
        } catch (err) {
            console.log(err);
            return res.status(500).json(ResponseHandler(httpStatus.BAD_GATEWAY, null, 'Error From Server'));
        }
    }

    async handleCreateBlog(req: Request, res: Response) {
        try {
            const isValid = await validateData(CreateBlogDTO, req.body, res);
            if (!isValid) return;
            const data = await ChukService.handleCreateBlog(req.body);
            return res.status(httpStatus.OK).json(data);
        } catch (err) {
            console.log(err);
            return res.status(500).json(ResponseHandler(httpStatus.BAD_GATEWAY, null, 'Error From Server'));
        }
    }

    async handleUpdateCate(req: Request, res: Response) {
        try {
            const isValid = await validateData(UpdateBlogDTO, req.body, res);
            if (!isValid) return;
            const data = await ChukService.handleUpdateCate(req.body);
            return res.status(httpStatus.OK).json(data);
        } catch (err) {
            console.log(err);
            return res.status(500).json(ResponseHandler(httpStatus.BAD_GATEWAY, null, 'Error From Server'));
        }
    }

    async handleUpdateBlog(req: Request, res: Response) {
        try {
            const isValid = await validateData(UpdateBlogDTO, req.body, res);
            if (!isValid) return;
            const data = await ChukService.handleUpdateBlog(req.body);
            return res.status(httpStatus.OK).json(data);
        } catch (err) {
            console.log(err);
            return res.status(500).json(ResponseHandler(httpStatus.BAD_GATEWAY, null, 'Error From Server'));
        }
    }

    async handleUpdateVisibleCate(req: Request, res: Response) {
        try {
            const isValid = await validateData(VisibleDTO, req.body, res);
            if (!isValid) return;
            const data = await ChukService.handleUpdateVisibleCate(req.body);
            return res.status(httpStatus.OK).json(data);
        } catch (err) {
            console.log(err);
            return res.status(500).json(ResponseHandler(httpStatus.BAD_GATEWAY, null, 'Error From Server'));
        }
    }

    async handleUpdateVisibleBlog(req: Request, res: Response) {
        try {
            const isValid = await validateData(VisibleDTO, req.body, res);
            if (!isValid) return;
            const data = await ChukService.handleUpdateVisibleBlog(req.body);
            return res.status(httpStatus.OK).json(data);
        } catch (err) {
            console.log(err);
            return res.status(500).json(ResponseHandler(httpStatus.BAD_GATEWAY, null, 'Error From Server'));
        }
    }

    async handleGetAllCate(req: Request, res: Response) {
        try {
            const data = await ChukService.handleGetAllCate(req.query.is_active === 'false' ? false : true);
            return res.status(httpStatus.OK).json(data);
        } catch (err) {
            console.log(err);
            return res.status(500).json(ResponseHandler(httpStatus.BAD_GATEWAY, null, 'Error From Server'));
        }
    }

    async handleGetAllBlog(req: Request, res: Response) {
        try {
            const query = {
                page: req.query.page ? parseInt(req.query.page.toString()) : 1,
                pageSize: req.query.pageSize ? parseInt(req.query.pageSize.toString()) : 1,
                is_active: req.query.is_acive === 'false' ? false : true,
                cateId: Number(req.query.cateId),
            };
            const data = await ChukService.handleGetAllBlog(query);
            return res.status(httpStatus.OK).json(data);
        } catch (err) {
            console.log(err);
            return res.status(500).json(ResponseHandler(httpStatus.BAD_GATEWAY, null, 'Error From Server'));
        }
    }

    async handleGetOneCate(req: Request, res: Response) {
        try {
            const data = await ChukService.handleGetOneCate(parseInt(req.params.id));
            return res.status(httpStatus.OK).json(data);
        } catch (err) {
            console.log(err);
            return res.status(500).json(ResponseHandler(httpStatus.BAD_GATEWAY, null, 'Error From Server'));
        }
    }

    async getDetailBlog(req: Request, res: Response) {
        try {
            const data = await ChukService.getDetailBlog(parseInt(req.params.id));
            return res.status(httpStatus.OK).json(data);
        } catch (err) {
            console.log(err);
            return res.status(500).json(ResponseHandler(httpStatus.BAD_GATEWAY, null, 'Error From Server'));
        }
    }

    async handleDeleteBlog(req: Request, res: Response) {
        try {
            const data = await ChukService.handleDeleteBlog(parseInt(req.params.id));
            return res.status(httpStatus.OK).json(data);
        } catch (err) {
            console.log(err);
            return res.status(500).json(ResponseHandler(httpStatus.BAD_GATEWAY, null, 'Error From Server'));
        }
    }
}

export default new ChukController();
