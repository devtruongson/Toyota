import dotenv from 'dotenv';
import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import jwt from 'jsonwebtoken';
import { role } from '~/utils/enum';
import { IPayloadJWT } from '~/utils/interface';
import { ResponseHandler } from '~/utils/Response';

dotenv.config();

export const handleCreateToken = (payload: IPayloadJWT, expire: string): string | null => {
    try {
        let key = process.env.JWT_SECRET as string;
        let token = jwt.sign(payload, key, {
            expiresIn: expire,
        });
        return token;
    } catch (err) {
        console.log(err);
        return null;
    }
};

export const handleVerifyToken = (token: string, isExp?: boolean): IPayloadJWT | null => {
    try {
        let key: string = process.env.JWT_SECRET as string;
        return jwt.verify(token, key, {
            ignoreExpiration: isExp ? isExp : false,
        }) as IPayloadJWT;
    } catch (err) {
        console.log(err);
        return null;
    }
};

// USER
export const handleCheckTokenUser = (req: Request, res: Response, next: NextFunction) => {
    try {
        if (!req.headers.authorization)
            return res
                .status(httpStatus.UNAUTHORIZED)
                .json(ResponseHandler(httpStatus.UNAUTHORIZED, null, 'token not found'));

        const token = req.headers.authorization?.replace('Bearer', '').trim();

        let decode = handleVerifyToken(token);

        if (!decode)
            return res
                .status(httpStatus.FORBIDDEN)
                .json(ResponseHandler(httpStatus.FORBIDDEN, null, "token can't decoded"));

        req.body.token_author = decode.email;

        if (decode.role === role.USER || decode.role === role.ADMIN) {
            next();
        } else {
            return res.status(403).json(ResponseHandler(httpStatus.FORBIDDEN, null, "your role aren't user"));
        }
    } catch (err) {
        console.log(err);
        return res
            .status(httpStatus.INTERNAL_SERVER_ERROR)
            .json(ResponseHandler(httpStatus.INTERNAL_SERVER_ERROR, null, 'error from server'));
    }
};

//ADMIN
export const handleCheckTokenAdmin = (req: Request, res: Response, next: NextFunction) => {
    try {
        if (!req.headers.authorization)
            return res
                .status(httpStatus.UNAUTHORIZED)
                .json(ResponseHandler(httpStatus.UNAUTHORIZED, null, 'token not found'));

        const token = req.headers.authorization?.replace('Bearer', '').trim();

        let decode = handleVerifyToken(token);

        if (!decode)
            return res
                .status(httpStatus.FORBIDDEN)
                .json(ResponseHandler(httpStatus.FORBIDDEN, null, "token can't decoded"));

        if (decode.role === role.ADMIN) {
            req.body.token_author = decode.email;
            next();
        } else {
            return res.status(403).json(ResponseHandler(httpStatus.FORBIDDEN, null, "your role aren't admin"));
        }
    } catch (err) {
        console.log(err);
        return res
            .status(httpStatus.INTERNAL_SERVER_ERROR)
            .json(ResponseHandler(httpStatus.INTERNAL_SERVER_ERROR, null, 'error from server'));
    }
};

//ADMIN
export const handleRefreshToken = (req: Request, res: Response, next: NextFunction) => {
    try {
        if (!req.headers.authorization)
            return res
                .status(httpStatus.UNAUTHORIZED)
                .json(ResponseHandler(httpStatus.UNAUTHORIZED, null, 'token not found'));

        const token = req.headers.authorization?.replace('Bearer', '').trim();
        const refreshToken = req.body.refresh_token;
        if (!refreshToken)
            return res
                .status(httpStatus.UNAUTHORIZED)
                .json(ResponseHandler(httpStatus.UNAUTHORIZED, null, 'refresh token not found'));

        let decodeAccess = handleVerifyToken(token, true);
        let decodeRefresh = handleVerifyToken(refreshToken);

        if (decodeAccess?.email === decodeRefresh?.email) {
            req.body.email = decodeAccess?.email;
            next();
        } else {
            return res
                .status(403)
                .json(ResponseHandler(httpStatus.FORBIDDEN, null, "refresh token and access token don't match"));
        }
    } catch (err) {
        console.log(err);
        return res
            .status(httpStatus.INTERNAL_SERVER_ERROR)
            .json(ResponseHandler(httpStatus.INTERNAL_SERVER_ERROR, null, 'error from server'));
    }
};
