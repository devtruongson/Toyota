import httpStatus from 'http-status';
import { CreateCarDTO } from '~/dtos/CreateCar.dto';
import Car from '~/models/Car';
import CarFeature from '~/models/CarFeature';
import { ResponseHandler } from '~/utils/Response';
import { Request } from 'express';

class CarService {
    async handleCreateCar(data: CreateCarDTO) {
        try {
            const car = (await Car.create({
                ...data,
            })) as any;
            await Promise.all(
                data.car_features.map(async (image) => {
                    await CarFeature.create({
                        ...image,
                        car_id: car.id,
                    });
                }),
            );
            const dataRes = await Car.findOne({
                where: {
                    id: car.id,
                },
                include: [
                    {
                        model: CarFeature,
                        as: 'car_features',
                    },
                ],
            });

            return ResponseHandler(httpStatus.OK, dataRes, 'Create Car Successfully');
        } catch (err) {
            console.log(err);
            Promise.reject(ResponseHandler(httpStatus.BAD_GATEWAY, null, 'có lỗi xảy ra!'));
        }
    }

    async handleUpdateCar(data: CreateCarDTO) {
        try {
            console.log(!data.car_id);
            if (!data.car_id) {
                return ResponseHandler(httpStatus.BAD_REQUEST, null, 'BAD REQUEST MISSING PARM car_id');
            }
            const dataUpdate = await Car.update(
                {
                    ...data,
                },
                {
                    where: {
                        id: data.car_id,
                    },
                },
            );

            return ResponseHandler(httpStatus.OK, dataUpdate, 'Update Car Successfully');
        } catch (err) {
            console.log(err);
            Promise.reject(ResponseHandler(httpStatus.BAD_GATEWAY, null, 'có lỗi xảy ra!'));
        }
    }

    async handleGetAllCar(data: { page: number; pageSize: number; is_active: boolean | null }) {
        try {
            let offset: number = (data.page - 1) * data.pageSize;
            const options: any = {};

            if (data.is_active !== null) {
                options.is_active = data.is_active;
            }

            let { count, rows }: { count: number; rows: any } = await Car.findAndCountAll({
                where: {
                    ...options,
                },
                include: [
                    {
                        model: CarFeature,
                        as: 'car_features',
                    },
                ],
                offset: offset,
                limit: data.pageSize,
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

    async handleGetDetailCar(id: number) {
        try {
            const data = await Car.findOne({
                where: {
                    id,
                },
                include: [
                    {
                        model: CarFeature,
                        as: 'car_features',
                    },
                ],
            });
            return ResponseHandler(httpStatus.OK, data, 'ok');
        } catch (err) {
            console.log(err);
            Promise.reject(ResponseHandler(httpStatus.BAD_GATEWAY, null, 'có lỗi xảy ra!'));
        }
    }

    async handleUpdateVisible(id: number, is_active: boolean) {
        try {
            if (!id) {
                return ResponseHandler(httpStatus.BAD_REQUEST, null, 'BAD REQUEST MISSING PARM car_id');
            }
            const dataUpdate = await Car.update(
                {
                    is_active: is_active,
                },
                {
                    where: {
                        id: id,
                    },
                },
            );
            return ResponseHandler(httpStatus.OK, dataUpdate, 'ok');
        } catch (err) {
            console.log(err);
            Promise.reject(ResponseHandler(httpStatus.BAD_GATEWAY, null, 'có lỗi xảy ra!'));
        }
    }

    async handleUpdateVisibleStatusImage(id: number, is_active: boolean) {
        try {
            if (!id) {
                return ResponseHandler(httpStatus.BAD_REQUEST, null, 'BAD REQUEST MISSING PARM ID IMAGE');
            }
            const dataUpdate = await CarFeature.update(
                {
                    is_active: is_active,
                },
                {
                    where: {
                        id: id,
                    },
                },
            );
            return ResponseHandler(httpStatus.OK, dataUpdate, 'ok');
        } catch (err) {
            console.log(err);
            Promise.reject(ResponseHandler(httpStatus.BAD_GATEWAY, null, 'có lỗi xảy ra!'));
        }
    }

    async handleDeleteImageCar(id: number) {
        try {
            await CarFeature.destroy({
                where: {
                    id: id,
                },
            });
            return ResponseHandler(httpStatus.OK, null, 'Delete Car Successfully');
        } catch (err) {
            console.log(err);
            Promise.reject(ResponseHandler(httpStatus.BAD_GATEWAY, null, 'có lỗi xảy ra!'));
        }
    }

    async getCarByModel(model: string) {
        try {
            if (!model) {
                return ResponseHandler(httpStatus.BAD_REQUEST, null, 'BAD REQUEST: MISSING OR INVALID model');
            }

            const cars = await Car.findAll({
                where: { model: model, is_active: true },
                include: [
                    {
                        model: CarFeature,
                        as: 'car_features',
                    },
                ],
            });

            return ResponseHandler(httpStatus.OK, cars, ' Successfully');
        } catch (error) {
            console.log(error);
            Promise.reject(ResponseHandler(httpStatus.BAD_GATEWAY, null, 'có lỗi xảy ra!'));
        }
    }

    async handleDeleteCar(id: number) {
        try {
            await Car.destroy({
                where: { id: id },
            });
            return ResponseHandler(httpStatus.OK, null, ' Successfully');
        } catch (error) {
            console.log(error);
            Promise.reject(ResponseHandler(httpStatus.BAD_GATEWAY, null, 'có lỗi xảy ra!'));
        }
    }

    async handleUpdateCarService(req: Request) {
        try {
            const id = req.body.id;
            if (!id) {
                return ResponseHandler(httpStatus.BAD_REQUEST, null, 'BAD REQUEST MISSING PARM car_id');
            }
            await Car.update(
                { ...req.body },
                {
                    where: { id: id },
                },
            );
            return ResponseHandler(httpStatus.OK, null, ' Successfully');
        } catch (error) {
            console.log(error);
            Promise.reject(ResponseHandler(httpStatus.BAD_GATEWAY, null, 'có lỗi xảy ra!'));
        }
    }

    async handleCreateFeature(req: Request) {
        try {
            const id = req.body.car_id;
            if (!id) {
                return ResponseHandler(httpStatus.BAD_REQUEST, null, 'BAD REQUEST MISSING PARM car_id');
            }
            await CarFeature.create({ ...req.body });
            return ResponseHandler(httpStatus.OK, null, ' Successfully');
        } catch (error) {
            console.log(error);
            Promise.reject(ResponseHandler(httpStatus.BAD_GATEWAY, null, 'có lỗi xảy ra!'));
        }
    }
}

export default new CarService();
