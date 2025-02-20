import axios from '../axios';
import { IRes } from '../utils/interface';

export const sendEmailService = async (data: { email: string; html: string }): Promise<IRes<null>> => {
    return (await axios.post('/v1/form/send-email', data)) as IRes<null>;
};

export const sendEmailAllService = async (data: { html: string }): Promise<IRes<null>> => {
    return (await axios.post('/v1/form/send-email-all', data)) as IRes<null>;
};
