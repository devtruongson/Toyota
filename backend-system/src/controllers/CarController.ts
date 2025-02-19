import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { CreateCarDTO } from '~/dtos/CreateCar.dto';
import CarService from '~/services/CarService';
import { ResponseHandler } from '~/utils/Response';
import { validateData } from '~/utils/validate';

class CarController {
    async handleCreateCar(req: Request, res: Response) {
        try {
            const isValid = await validateData(CreateCarDTO, req.body, res);
            if (!isValid) return;
            const data = await CarService.handleCreateCar(req.body);
            return res.status(httpStatus.OK).json(data);
        } catch (err) {
            console.log(err);
            return res.status(500).json(ResponseHandler(httpStatus.BAD_GATEWAY, null, 'Error From Server'));
        }
    }

    async handleGetAllCar(req: Request, res: Response) {
        try {
            const options = {
                page: req.query.page ? parseInt(req.query.page.toString()) : 1,
                pageSize: req.query.pageSize ? parseInt(req.query.pageSize.toString()) : 10,
                is_active: req.query.is_active === 'all' ? null : req.query.is_active === 'false' ? false : true,
            };
            const data = await CarService.handleGetAllCar(options);
            return res.status(httpStatus.OK).json(data);
        } catch (err) {
            console.log(err);
            return res.status(500).json(ResponseHandler(httpStatus.BAD_GATEWAY, null, 'Error From Server'));
        }
    }

    async handleGetDetailCar(req: Request, res: Response) {
        try {
            const data = await CarService.handleGetDetailCar(parseInt(req.params.id));
            return res.status(httpStatus.OK).json(data);
        } catch (err) {
            console.log(err);
            return res.status(500).json(ResponseHandler(httpStatus.BAD_GATEWAY, null, 'Error From Server'));
        }
    }

    async handleUpdateCar(req: Request, res: Response) {
        try {
            const isValid = await validateData(CreateCarDTO, req.body, res);
            if (!isValid) return;
            const data = await CarService.handleUpdateCar(req.body);
            return res.status(httpStatus.OK).json(data);
        } catch (err) {
            console.log(err);
            return res.status(500).json(ResponseHandler(httpStatus.BAD_GATEWAY, null, 'Error From Server'));
        }
    }

    async handleUpdateVisible(req: Request, res: Response) {
        try {
            const data = await CarService.handleUpdateVisible(req.body.car_id, req.body.is_active);
            return res.status(httpStatus.OK).json(data);
        } catch (err) {
            console.log(err);
            return res.status(500).json(ResponseHandler(httpStatus.BAD_GATEWAY, null, 'Error From Server'));
        }
    }

    async handleUpdateVisibleStatusImage(req: Request, res: Response) {
        try {
            const data = await CarService.handleUpdateVisibleStatusImage(req.body.id, req.body.is_active);
            return res.status(httpStatus.OK).json(data);
        } catch (err) {
            console.log(err);
            return res.status(500).json(ResponseHandler(httpStatus.BAD_GATEWAY, null, 'Error From Server'));
        }
    }

    async handleDeleteImageCar(req: Request, res: Response) {
        try {
            const data = await CarService.handleDeleteImageCar(parseInt(req.params.id));
            return res.status(httpStatus.OK).json(data);
        } catch (err) {
            console.log(err);
            return res.status(500).json(ResponseHandler(httpStatus.BAD_GATEWAY, null, 'Error From Server'));
        }
    }

    async handleGetCarByModel(req: Request, res: Response) {
        try {
            const model = String(req.query.model);
            const data = await CarService.getCarByModel(model);
            return res.status(httpStatus.OK).json(data);
        } catch (err) {
            console.log(err);
            return res.status(500).json(ResponseHandler(httpStatus.BAD_GATEWAY, null, 'Error From Server'));
        }
    }

    async handleDeleteCar(req: Request, res: Response) {
        try {
            const data = await CarService.handleDeleteCar(Number(req.params.id));
            return res.status(httpStatus.OK).json(data);
        } catch (error) {
            console.log(error);
            return res.status(500).json(ResponseHandler(httpStatus.BAD_GATEWAY, null, 'Error From Server'));
        }
    }

    async handleUpdateInfo(req: Request, res: Response) {
        try {
            const data = await CarService.handleUpdateCarService(req);
            return res.status(httpStatus.OK).json(data);
        } catch (error) {
            console.log(error);
            return res.status(500).json(ResponseHandler(httpStatus.BAD_GATEWAY, null, 'Error From Server'));
        }
    }

    async handleCreateFeature(req: Request, res: Response) {
        try {
            const data = await CarService.handleCreateFeature(req);
            return res.status(httpStatus.OK).json(data);
        } catch (error) {
            console.log(error);
            return res.status(500).json(ResponseHandler(httpStatus.BAD_GATEWAY, null, 'Error From Server'));
        }
    }
}

export default new CarController();
