import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { RegisterFormDTO } from '~/dtos/RegisterForm.dto';
import { SendEmailToClientDTO } from '~/dtos/SendEmailToClient.dto';
import { UpdateStatusFormDTO } from '~/dtos/UpdateStatusForm.dto';
import FormRegisterService from '~/services/FormRegisterService';
import { IQueryForm } from '~/utils/interface';
import { ResponseHandler } from '~/utils/Response';
import { validateData } from '~/utils/validate';

class FormRegisterController {
    async handleRegisterForm(req: Request, res: Response) {
        try {
            const isValid = await validateData(RegisterFormDTO, req.body, res);
            if (!isValid) return;
            const data = await FormRegisterService.registerFormService(req.body);
            return res.status(httpStatus.OK).json(data);
        } catch (err) {
            console.log(err);
            return res.status(500).json(ResponseHandler(httpStatus.BAD_GATEWAY, null, 'Error From Server'));
        }
    }

    async handleGetAllForm(req: Request, res: Response) {
        try {
            const dataQuery: IQueryForm = {
                q: req.query.q ? req.query.q.toString() : '',
                sort: req.query.sort === 'asc' || req.query.sort === 'desc' ? req.query.sort : 'asc',
                type: req.query.type === 'BOOK_DEMO' ? 'BOOK_DEMO' : 'TEST_DRIVE',
            };
            if (req.query.status) {
                dataQuery['status'] =
                    req.query.status === 'pending' || req.query.status === 'approved' ? req.query.status : 'pending';
            }
            const data = await FormRegisterService.handleGetAllForm(dataQuery);
            return res.status(httpStatus.OK).json(data);
        } catch (err) {
            console.log(err);
            return res.status(500).json(ResponseHandler(httpStatus.BAD_GATEWAY, null, 'Error From Server'));
        }
    }

    async handleUpdateStatus(req: Request, res: Response) {
        try {
            const isValid = await validateData(UpdateStatusFormDTO, req.body, res);
            if (!isValid) return;
            const data = await FormRegisterService.handleUpdateStatus(req.body);
            return res.status(httpStatus.OK).json(data);
        } catch (err) {
            console.log(err);
            return res.status(500).json(ResponseHandler(httpStatus.BAD_GATEWAY, null, 'Error From Server'));
        }
    }

    async handleSendEmail(req: Request, res: Response) {
        try {
            const isValid = await validateData(SendEmailToClientDTO, req.body, res);
            if (!isValid) return;
            const data = await FormRegisterService.handleSendEmail(req.body);
            return res.status(httpStatus.OK).json(data);
        } catch (err) {
            console.log(err);
            return res.status(500).json(ResponseHandler(httpStatus.BAD_GATEWAY, null, 'Error From Server'));
        }
    }

    async handleSendEmailAll(req: Request, res: Response) {
        try {
            const isValid = req.body.html;
            if (!isValid) {
                return res.status(500).json(ResponseHandler(httpStatus.BAD_GATEWAY, null, 'Missing params'));
            }
            const data = await FormRegisterService.handleSendEmailAll(req.body);
            return res.status(httpStatus.OK).json(data);
        } catch (err) {
            console.log(err);
            return res.status(500).json(ResponseHandler(httpStatus.BAD_GATEWAY, null, 'Error From Server'));
        }
    }
}

export default new FormRegisterController();
