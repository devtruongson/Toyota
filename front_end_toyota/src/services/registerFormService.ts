import axios from '../axios';
import { IRegisterForm, IRes } from '../utils/interface';

export const registerFormService = async (data: IRegisterForm): Promise<IRes<null>> => {
    const dataRes = (await axios.post(`/v1/form/register`, data)) as IRes<null>;
    return dataRes;
};

export const changeStatusFormService = async (data: { id_form: number; status: boolean }): Promise<IRes<null>> => {
    const dataRes = (await axios.patch(`/v1/form/change-status`, data)) as IRes<null>;
    return dataRes;
};

export const getAllRegisterForm = async (
    type: 'BOOK_DEMO' | 'TEST_DRIVE',
    otherQuery?: string,
): Promise<IRes<IRegisterForm[]>> => {
    const dataRes = (await axios.get(`/v1/form/list?type=${type}${otherQuery ? otherQuery : ''}`)) as IRes<
        IRegisterForm[]
    >;
    return dataRes;
};

export const getAllRegisterFormByMe = async (
    type: 'BOOK_DEMO' | 'TEST_DRIVE',
    otherQuery?: string,
): Promise<IRes<IRegisterForm[]>> => {
    const dataRes = (await axios.get(`/v1/user/form?type=${type}${otherQuery ? otherQuery : ''}`)) as IRes<
        IRegisterForm[]
    >;
    return dataRes;
};
