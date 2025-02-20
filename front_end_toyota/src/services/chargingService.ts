import axios from '../axios';
import { ICharging, IRes } from '../utils/interface';

export const getAllChargingService = async (): Promise<IRes<ICharging[]>> => {
    return (await axios.get('/v1/charging')) as IRes<ICharging[]>;
};

export const updateChargingService = async (data: ICharging): Promise<IRes<number[]>> => {
    return (await axios.put('/v1/charging', data)) as IRes<number[]>;
};

export const createChargingService = async (data: {
    name: string;
    location: string;
    power_kw: string;
}): Promise<IRes<ICharging>> => {
    return (await axios.post('/v1/charging', data)) as IRes<ICharging>;
};

export const deleteChargingService = async (id: number): Promise<IRes<number[]>> => {
    return (await axios.delete(`/v1/charging/${id}`)) as IRes<number[]>;
};
