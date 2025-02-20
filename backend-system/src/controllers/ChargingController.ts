import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { updateChargingDto } from '~/dtos/updateCharging.dto';
import ChargingService from '~/services/ChargingService';
import { ResponseHandler } from '~/utils/Response';
import { validateData } from '~/utils/validate';
import { createChargingDto } from './../dtos/createCharging.dto';

class ChargingController {
    async getAllCharging(req: Request, res: Response) {
        try {
            const data = await ChargingService.getAllCharging();
            return res.status(httpStatus.OK).json(data);
        } catch (err) {
            console.log(err);
            return res.status(500).json(ResponseHandler(httpStatus.BAD_GATEWAY, null, 'Error From Server'));
        }
    }

    async createCharging(req: Request, res: Response) {
        try {
            const isValid = await validateData(createChargingDto, req.body, res);
            if (!isValid) return;
            const data = await ChargingService.createCharging(req.body);
            return res.status(httpStatus.OK).json(data);
        } catch (err) {
            console.log(err);
            return res.status(500).json(ResponseHandler(httpStatus.BAD_GATEWAY, null, 'Error From Server'));
        }
    }

    async updateCharging(req: Request, res: Response) {
        try {
            const isValid = await validateData(updateChargingDto, req.body, res);
            if (!isValid) return;
            const data = await ChargingService.updateCharging(req.body);
            return res.status(httpStatus.OK).json(data);
        } catch (err) {
            console.log(err);
            return res.status(500).json(ResponseHandler(httpStatus.BAD_GATEWAY, null, 'Error From Server'));
        }
    }

    async deleteCharging(req: Request, res: Response) {
        try {
            const data = await ChargingService.deleteCharging(parseInt(req.params.id));
            return res.status(httpStatus.OK).json(data);
        } catch (err) {
            console.log(err);
            return res.status(500).json(ResponseHandler(httpStatus.BAD_GATEWAY, null, 'Error From Server'));
        }
    }
}

export default new ChargingController();
