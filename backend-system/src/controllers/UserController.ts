import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { CreateUserDto } from '~/dtos/CreateUser.dto';
import { loginDto } from '~/dtos/login.dto';
import userService from '~/services/UserService';
import { ResponseHandler } from '~/utils/Response';
import { validateData } from '~/utils/validate';

class UserController {
    async handleGet(req: Request, res: Response) {
        return res.status(200).json('run');
    }

    async handleCreateUser(req: Request, res: Response) {
        try {
            const isValid = await validateData(CreateUserDto, req.body, res);
            if (!isValid) return;
            const data = await userService.createUserService(req.body);
            return res.status(httpStatus.OK).json(data);
        } catch (err) {
            console.log(err);
            return res.status(500).json(ResponseHandler(httpStatus.BAD_GATEWAY, null, 'Error From Server'));
        }
    }

    async handleLogin(req: Request, res: Response) {
        try {
            const isValid = await validateData(loginDto, req.body, res);
            if (!isValid) return;
            const data = await userService.loginUser(req.body);
            return res.status(httpStatus.OK).json(data);
        } catch (err) {
            console.log(err);
            return res.status(500).json(ResponseHandler(httpStatus.BAD_GATEWAY, null, 'Error From Server'));
        }
    }

    async getAllUsers(req: Request, res: Response) {
        try {
            const data = await userService.getAllUsers(req.query);
            return res.status(httpStatus.OK).json(data);
        } catch (err) {
            console.log(err);
            return res.status(500).json(ResponseHandler(httpStatus.BAD_GATEWAY, null, 'Error From Server'));
        }
    }

    async getOneUser(req: Request, res: Response) {
        try {
            const data = await userService.getOneUser(+req.params.id);
            return res.status(httpStatus.OK).json(data);
        } catch (err) {
            console.log(err);
            return res.status(500).json(ResponseHandler(httpStatus.BAD_GATEWAY, null, 'Error From Server'));
        }
    }

    async handleSearch(req: Request, res: Response) {
        try {
            let textSearch: string = req.query.q as string;
            let data = await userService.searchUserService(textSearch);
            return res.status(httpStatus.OK).json(data);
        } catch (err) {
            console.log(err);
            return res
                .status(httpStatus.INTERNAL_SERVER_ERROR)
                .json(ResponseHandler(httpStatus.INTERNAL_SERVER_ERROR, null, 'error from server'));
        }
    }
}

const userController = new UserController();
export default userController;
