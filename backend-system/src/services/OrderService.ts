import httpStatus from 'http-status';
import { CreateOrderDTO } from '~/dtos/CreateOrder.dto';
import Car from '~/models/Car';
import Order from '~/models/Order';
import User from '~/models/User';
import { statusOrder } from '~/utils/enum';
import { ResponseHandler } from '~/utils/Response';

class OrderService {
    async handleCreateOrder(data: CreateOrderDTO) {
        try {
            const order = await Order.create({
                ...data,
            });
            return ResponseHandler(httpStatus.OK, order, 'Create Order Successfully');
        } catch (err) {
            console.log(err);
            Promise.reject(ResponseHandler(httpStatus.BAD_GATEWAY, null, 'có lỗi xảy ra!'));
        }
    }

    async handleGetAllOrder(data: { page: number; pageSize: number; status: string }) {
        try {
            let offset: number = (data.page - 1) * data.pageSize;

            let { count, rows }: { count: number; rows: any } = await Order.findAndCountAll({
                where: {
                    status: data.status,
                },
                include: [
                    {
                        model: User,
                        as: 'user_data',
                        attributes: {
                            exclude: ['password'],
                        },
                    },
                    {
                        model: Car,
                        as: 'car_data',
                    },
                ],
                offset: offset,
                limit: +data.pageSize,
            });

            let resData = {
                items: rows,
                meta: {
                    currentPage: data.page,
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

    async handleGetAllOrderUser(data: { page: number; pageSize: number; status: string }, user_id: number) {
        try {
            let offset: number = (data.page - 1) * data.pageSize;

            let { count, rows }: { count: number; rows: any } = await Order.findAndCountAll({
                where: {
                    status: data.status,
                    user_id: user_id,
                },
                include: [
                    {
                        model: User,
                        as: 'user_data',
                        attributes: {
                            exclude: ['password'],
                        },
                    },
                    {
                        model: Car,
                        as: 'car_data',
                    },
                ],
                offset: offset,
                limit: +data.pageSize,
            });

            let resData = {
                items: rows,
                meta: {
                    currentPage: data.page,
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

    async handleGetDetailOrder(id: number) {
        try {
            const data = await Order.findOne({
                where: {
                    id: id,
                },
                include: [
                    {
                        model: User,
                        as: 'user_data',
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
            return ResponseHandler(httpStatus.OK, data, 'ok');
        } catch (err) {
            console.log(err);
            Promise.reject(ResponseHandler(httpStatus.BAD_GATEWAY, null, 'có lỗi xảy ra!'));
        }
    }

    async handleUpdateStatusOrder(id: number, status: statusOrder) {
        try {
            if (!id) {
                return ResponseHandler(httpStatus.BAD_REQUEST, null, 'Missing require parameter ID');
            }

            const data = await Order.update(
                {
                    status: status,
                },
                {
                    where: {
                        id: id,
                    },
                },
            );
            return ResponseHandler(httpStatus.OK, data, 'ok');
        } catch (err) {
            console.log(err);
            Promise.reject(ResponseHandler(httpStatus.BAD_GATEWAY, null, 'có lỗi xảy ra!'));
        }
    }
}

export default new OrderService();
