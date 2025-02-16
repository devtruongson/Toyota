import axios from '../axios';

import { ICate, IRes } from '../utils/interface';

export const getAllCateActive = async (): Promise<IRes<ICate[]>> => {
    const dataRes = (await axios.get(`/v1/chuk/cate?is_active=true`)) as IRes<ICate[]>;
    return dataRes;
};
