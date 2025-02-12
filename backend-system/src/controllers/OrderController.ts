import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { CreateOrderDTO } from '~/dtos/CreateOrder.dto';
import OrderService from '~/services/OrderService';
import { statusOrder } from '~/utils/enum';
import { ResponseHandler } from '~/utils/Response';
import { validateData } from '~/utils/validate';

class OrderController {
    async handleCreateOrder(req: Request, res: Response) {
        try {
            const isValid = await validateData(CreateOrderDTO, req.body, res);
            if (!isValid) return;
            const data = await OrderService.handleCreateOrder(req.body);
            return res.status(httpStatus.OK).json(data);
        } catch (err) {
            console.log(err);
            return res.status(500).json(ResponseHandler(httpStatus.BAD_GATEWAY, null, 'Error From Server'));
        }
    }

    async handleGetAllOrder(req: Request, res: Response) {
        try {
            const query = {
                page: req.query.page ? parseInt(req.query.page.toString()) : 1,
                pageSize: req.query.pageSize ? parseInt(req.query.pageSize.toString()) : 1,
                status: req.query.status ? req.query.status.toString() : statusOrder.PENDING,
            };
            const data = await OrderService.handleGetAllOrder(query);
            return res.status(httpStatus.OK).json(data);
        } catch (err) {
            console.log(err);
            return res.status(500).json(ResponseHandler(httpStatus.BAD_GATEWAY, null, 'Error From Server'));
        }
    }

    async handleGetAllOrderUser(req: Request, res: Response) {
        try {
            const query = {
                page: req.query.page ? parseInt(req.query.page.toString()) : 1,
                pageSize: req.query.pageSize ? parseInt(req.query.pageSize.toString()) : 1,
                status: req.query.status ? req.query.status.toString() : statusOrder.PENDING,
            };
            const data = await OrderService.handleGetAllOrderUser(query, parseInt(req.params.id));
            return res.status(httpStatus.OK).json(data);
        } catch (err) {
            console.log(err);
            return res.status(500).json(ResponseHandler(httpStatus.BAD_GATEWAY, null, 'Error From Server'));
        }
    }

    async handleGetDetailOrder(req: Request, res: Response) {
        try {
            const data = await OrderService.handleGetDetailOrder(parseInt(req.params.id));
            return res.status(httpStatus.OK).json(data);
        } catch (err) {
            console.log(err);
            return res.status(500).json(ResponseHandler(httpStatus.BAD_GATEWAY, null, 'Error From Server'));
        }
    }

    async handleUpdateStatusOrder(req: Request, res: Response) {
        try {
            const data = await OrderService.handleUpdateStatusOrder(parseInt(req.body.id), req.body.status);
            return res.status(httpStatus.OK).json(data);
        } catch (err) {
            console.log(err);
            return res.status(500).json(ResponseHandler(httpStatus.BAD_GATEWAY, null, 'Error From Server'));
        }
    }
}

export default new OrderController();
