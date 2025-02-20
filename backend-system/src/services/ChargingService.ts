import httpStatus from 'http-status';
import { createChargingDto } from '~/dtos/createCharging.dto';
import { updateChargingDto } from '~/dtos/updateCharging.dto';
import ChargingStations from '~/models/ChargingStations';
import { ResponseHandler } from '~/utils/Response';

class ChargingService {
    async getAllCharging() {
        try {
            const data = await ChargingStations.findAll();
            return ResponseHandler(httpStatus.OK, data, 'ok');
        } catch (err) {
            console.log(err);
            Promise.reject(ResponseHandler(httpStatus.BAD_GATEWAY, null, 'có lỗi xảy ra!'));
        }
    }

    async createCharging(data: createChargingDto) {
        try {
            const dataCreate = await ChargingStations.create({
                ...data,
            });
            return ResponseHandler(httpStatus.OK, dataCreate, 'ok');
        } catch (err) {
            console.log(err);
            Promise.reject(ResponseHandler(httpStatus.BAD_GATEWAY, null, 'có lỗi xảy ra!'));
        }
    }

    async updateCharging(data: updateChargingDto) {
        try {
            const dataUpdate = await ChargingStations.update(
                {
                    name: data.name,
                    location: data.location,
                    power_kw: data.power_kw,
                },
                {
                    where: {
                        id: data.id,
                    },
                },
            );
            return ResponseHandler(httpStatus.OK, dataUpdate, 'ok');
        } catch (err) {
            console.log(err);
            Promise.reject(ResponseHandler(httpStatus.BAD_GATEWAY, null, 'có lỗi xảy ra!'));
        }
    }

    async deleteCharging(id: number) {
        try {
            const dataDel = await ChargingStations.destroy({
                where: {
                    id: id,
                },
            });
            return ResponseHandler(httpStatus.OK, dataDel, 'ok');
        } catch (err) {
            console.log(err);
            Promise.reject(ResponseHandler(httpStatus.BAD_GATEWAY, null, 'có lỗi xảy ra!'));
        }
    }
}

export default new ChargingService();
