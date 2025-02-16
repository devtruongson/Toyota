import axios from '../axios';
import { ModelType } from '../types/car';
import { ICar, IPagin, IRes } from '../utils/interface';

export const getAllCar = async (
    page: number,
    pageSize: number,
    is_active: boolean | string,
): Promise<IRes<IPagin<ICar>>> => {
    const dataRes = (await axios.get(`/v1/car?page=${page}&pageSize=${pageSize}&is_active=${is_active}`)) as IRes<
        IPagin<ICar>
    >;
    return dataRes;
};

export const changeVisibleCarService = async (data: {
    car_id: number;
    is_active: boolean;
}): Promise<IRes<number[]>> => {
    const dataRes = (await axios.patch(`/v1/car`, data)) as IRes<number[]>;
    return dataRes;
};

export const uploadCar = async (data: ICar): Promise<IRes<ICar>> => {
    const dataRes = (await axios.post(`/v1/car`, data)) as IRes<ICar>;
    return dataRes;
};

export const getDetailCarService = async (id: number): Promise<IRes<ICar>> => {
    const dataRes = (await axios.get(`/v1/car/${id}`)) as IRes<ICar>;
    return dataRes;
};

export const getCarBuyModel = async (model: ModelType): Promise<IRes<ICar[]>> => {
    const dataRes = (await axios.get(`/v1/car/get-by-model?model=${model}`)) as IRes<ICar[]>;
    return dataRes;
};
