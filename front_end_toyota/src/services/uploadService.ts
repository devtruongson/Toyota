import axios from '../axios';
import { IRes, IUpload } from '../utils/interface';

export const uploadFileService = async (data: { file: File }): Promise<IRes<IUpload>> => {
    const dataRes = (await axios.post(`/v1/upload`, data, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    })) as IRes<IUpload>;
    return dataRes;
};
