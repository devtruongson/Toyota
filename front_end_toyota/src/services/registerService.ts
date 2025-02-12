import axios from '../axios';
import { IRegister, IRes } from '../utils/interface';

export const registerService = async (data: IRegister): Promise<IRes<null>> => {
    const dataRes = (await axios.post('/v1/user/register', data)) as IRes<null>;
    return dataRes;
};
