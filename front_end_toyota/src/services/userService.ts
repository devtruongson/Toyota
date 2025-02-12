import axios from '../axios';
import { IPagin, IRes, IUser } from '../utils/interface';

export const getAllUser = async (page: number, pageSize: number, role: string): Promise<IRes<IPagin<IUser>>> => {
    const dataRes = (await axios.get(`/v1/user/all?role=${role}&page=${page}&pageSize=${pageSize}`)) as IRes<
        IPagin<IUser>
    >;
    return dataRes;
};

export const searchUserService = async (query: string): Promise<IRes<IUser[]>> => {
    const dataRes = (await axios.get(`/v1/user/search?q=${query}`)) as IRes<IUser[]>;
    return dataRes;
};

export const getOneUser = async (user_id: number): Promise<IRes<IUser>> => {
    const dataRes = (await axios.get(`/v1/user/${user_id}`)) as IRes<IUser>;
    return dataRes;
};
