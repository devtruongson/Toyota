import axios from '../axios';
import { ILoginForm, IRes, ITokens, IUser } from '../utils/interface';

export const loginService = async (
    data: ILoginForm,
): Promise<
    IRes<{
        user: IUser;
        tokens: ITokens;
    } | null>
> => {
    const dataRes = (await axios.post('/v1/user/login', {
        email: data.username,
        password: data.password,
    })) as IRes<{
        user: IUser;
        tokens: ITokens;
    }>;
    return dataRes;
};
