import axios from '../axios';
import { IBlog, IPagin, IRes } from '../utils/interface';

export const getAllBlogs = async (page: number, pageSize: number, cateId?: number): Promise<IRes<IPagin<IBlog>>> => {
    const dataRes = (await axios.get(`/v1/chuk/blog?cateId=${cateId}&page=${page}&pageSize=${pageSize}`)) as IRes<
        IPagin<IBlog>
    >;
    return dataRes;
};
