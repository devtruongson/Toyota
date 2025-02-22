import dotenv from 'dotenv';
import httpStatus from 'http-status';
import { Op } from 'sequelize';
import { loginDto } from '~/dtos/login.dto';
import { comparePassword, endCodePassword } from '~/helpers/bcrypt';
import { handleCreateToken } from '~/middleware/jwtActions';
import Car from '~/models/Car';
import FormRegister from '~/models/FormRegister';
import Order from '~/models/Order';
import User from '~/models/User';
import { IUser } from '~/utils/interface';
import { ResponseHandler } from '~/utils/Response';
dotenv.config();

class UserService {
    async createUserService(body: IUser) {
        try {
            const isUserExits = await this.checkUserExit(body.email, 'check');
            if (isUserExits) {
                return ResponseHandler(httpStatus.BAD_REQUEST, null, 'User already exists');
            }

            const passwordHash = await endCodePassword(body.password);
            const user = User.create({
                ...body,
                password: passwordHash,
            });
            return ResponseHandler(httpStatus.OK, user, 'User create successfully');
        } catch (err) {
            console.log(err);
            Promise.reject(ResponseHandler(httpStatus.BAD_GATEWAY, null, 'có lỗi xảy ra!'));
        }
    }

    async loginUser(body: loginDto) {
        try {
            const dataCheck = await this.checkUserExit(body.email, 'query');
            if (typeof dataCheck !== 'object') return ResponseHandler(httpStatus.BAD_GATEWAY, null, 'có lỗi xảy ra!');
            if (!dataCheck.User) {
                return ResponseHandler(httpStatus.BAD_REQUEST, null, 'Account Does Not Exits!');
            }

            if (!dataCheck.isValid) {
                return ResponseHandler(httpStatus.BAD_REQUEST, null, 'User not exists');
            }

            const checkPassword = await comparePassword(body.password, dataCheck.User.password);

            const tokenAccess = handleCreateToken(
                {
                    id: dataCheck.User.id,
                    email: dataCheck.User.email,
                    phone_number: dataCheck.User.phone_number,
                    is_login_social: dataCheck.User.is_login_social,
                    role: dataCheck.User.role,
                },
                '30day',
            );
            const tokenRefresh = handleCreateToken(
                {
                    id: dataCheck.User.id,
                    email: dataCheck.User.email,
                    phone_number: dataCheck.User.phone_number,
                    is_login_social: dataCheck.User.is_login_social,
                    role: dataCheck.User.role,
                },
                '360day',
            );
            const user = {
                ...dataCheck.User,
            } as any;
            delete user.password;

            if (checkPassword) {
                return ResponseHandler(
                    httpStatus.OK,
                    {
                        user: user,
                        tokens: {
                            access_token: tokenAccess,
                            refresh_token: tokenRefresh,
                        },
                    },
                    'User login successfully',
                );
            } else {
                return ResponseHandler(httpStatus.BAD_REQUEST, null, 'Wrong password');
            }
        } catch (err) {
            console.log(err);
            Promise.reject(ResponseHandler(httpStatus.BAD_GATEWAY, null, 'có lỗi xảy ra!'));
        }
    }

    async getAllUsers(data: any) {
        try {
            let offset: number = (data.page - 1) * data.pageSize;

            let { count, rows }: { count: number; rows: any } = await User.findAndCountAll({
                where: {
                    role: data.role ? data.role : 'user',
                },
                include: [
                    {
                        model: Order,
                        as: 'order_list',
                    },
                ],
                attributes: {
                    exclude: ['password'],
                },
                offset: offset,
                limit: +data.pageSize,
            });

            let resData = {
                items: rows,
                meta: {
                    currentPage: parseInt(data.page),
                    totalIteams: count,
                    totalPages: Math.ceil(count / data.pageSize),
                },
            };
            return ResponseHandler(httpStatus.OK, resData, 'ok');
        } catch (err) {
            console.log(err);
            Promise.reject(ResponseHandler(httpStatus.BAD_GATEWAY, null, 'có lỗi xảy ra!'));
        }
    }

    async getOneUser(id: number) {
        try {
            const user = await User.findOne({
                where: {
                    id,
                },
                include: [
                    {
                        model: Order,
                        as: 'order_list',
                    },
                ],
                attributes: {
                    exclude: ['password'],
                },
            });
            if (!user) {
                return ResponseHandler(httpStatus.BAD_REQUEST, {}, 'not found');
            } else {
                return ResponseHandler(httpStatus.OK, user, 'ok');
            }
        } catch (err) {
            console.log(err);
            Promise.reject(ResponseHandler(httpStatus.BAD_GATEWAY, null, 'có lỗi xảy ra!'));
        }
    }

    async searchUserService(textSearch: string) {
        try {
            const data = await User.findAll({
                where: {
                    [Op.or]: [
                        { first_name: { [Op.like]: `%${textSearch}%` } },
                        { last_name: { [Op.like]: `%${textSearch}%` } },
                        { email: { [Op.like]: `%${textSearch}%` } },
                        { phone_number: { [Op.like]: `%${textSearch}%` } },
                        { address_detail: { [Op.like]: `%${textSearch}%` } },
                    ],
                },
                attributes: {
                    exclude: ['password'],
                },
            });

            return ResponseHandler(httpStatus.OK, data, 'Search successfully');
        } catch (err) {
            console.log(err);
            Promise.reject(ResponseHandler(httpStatus.BAD_GATEWAY, null, 'có lỗi xảy ra!'));
        }
    }

    async refreshTokenService(email: string) {
        try {
            const data = await this.checkUserExit(email, 'query');

            if (typeof data !== 'object')
                return Promise.reject(ResponseHandler(httpStatus.BAD_GATEWAY, null, 'có lỗi xảy ra!'));
            if (!data.User) {
                return Promise.reject(ResponseHandler(httpStatus.BAD_GATEWAY, null, 'có lỗi xảy ra!'));
            }

            if (!data.isValid) {
                return ResponseHandler(httpStatus.BAD_REQUEST, null, 'User not exists');
            }

            const tokenAccess = handleCreateToken(
                {
                    id: data.User.id,
                    email: data.User.email,
                    phone_number: data.User.phone_number,
                    is_login_social: data.User.is_login_social,
                    role: data.User.role,
                },
                '30day',
            );
            const tokenRefresh = handleCreateToken(
                {
                    id: data.User.id,
                    email: data.User.email,
                    phone_number: data.User.phone_number,
                    is_login_social: data.User.is_login_social,
                    role: data.User.role,
                },
                '360day',
            );

            return ResponseHandler(
                httpStatus.OK,
                {
                    access_token: tokenAccess,
                    refresh_token: tokenRefresh,
                },
                'Refresh Token Successfully',
            );
        } catch (err) {
            console.log(err);
            Promise.reject(ResponseHandler(httpStatus.BAD_GATEWAY, null, 'có lỗi xảy ra!'));
        }
    }

    async getAllForm(email: string, type: string) {
        try {
            const data = await FormRegister.findAll({
                where: {
                    type: type,
                },
                include: [
                    {
                        model: User,
                        as: 'user_data',
                        where: {
                            email: email,
                        },
                        attributes: {
                            exclude: ['password'],
                        },
                    },
                    {
                        model: Car,
                        as: 'car_data',
                    },
                ],
            });

            return ResponseHandler(httpStatus.OK, data, 'Get All Form successfully');
        } catch (error) {
            console.log(error);
            Promise.reject(ResponseHandler(httpStatus.BAD_GATEWAY, null, 'có lỗi xảy ra!'));
        }
    }

    async checkUserExit(
        email: string,
        type: 'check' | 'query' = 'check',
    ): Promise<
        | boolean
        | {
              User: IUser | null;
              isValid: boolean;
          }
    > {
        let isValid = false;
        const user = (await User.findOne({
            where: {
                email,
            },
            raw: true,
            nest: true,
        })) as IUser | null;

        if (user) {
            isValid = true;
        }

        return type !== 'check'
            ? {
                  User: user,
                  isValid: isValid,
              }
            : isValid;
    }
}

export default new UserService();
