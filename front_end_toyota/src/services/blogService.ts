import axios from '../axios';
import { IBlog, IPagin, IRes } from '../utils/interface';

export const getAllBlogs = async (page: number, pageSize: number, cateId?: number): Promise<IRes<IPagin<IBlog>>> => {
    const dataRes = (await axios.get(`/v1/chuk/blog?cateId=${cateId}&page=${page}&pageSize=${pageSize}`)) as IRes<
        IPagin<IBlog>
    >;
    return dataRes;
};

export const getAllBlogsAdmin = async (
    page: number,
    pageSize: number,
    cateId?: number,
    is_active?: boolean,
): Promise<IRes<IPagin<IBlog>>> => {
    const dataRes = (await axios.get(
        `/v1/chuk/blog?page=${page}&pageSize=${pageSize}${cateId ? `&cateId=${cateId}` : ''}${
            is_active !== undefined ? `&is_active=${is_active}` : ''
        }`,
    )) as IRes<IPagin<IBlog>>;
    return dataRes;
};

export const deleteBlogService = async (id: number): Promise<IRes<number>> => {
    const dataRes = (await axios.delete(`/v1/chuk/blog/${id}`)) as IRes<number>;
    return dataRes;
};

export const createBlogService = async (data: {
    thumbnail: string;
    title: string;
    meta_description: string;
    content: string;
    is_active: boolean;
    cate_id: null | number;
}): Promise<IRes<IBlog>> => {
    const dataRes = (await axios.post(`/v1/chuk/blog`, data)) as IRes<IBlog>;
    return dataRes;
};

export const updateVisibleBlog = async (data: { id: number; is_active: boolean }): Promise<IRes<number[]>> => {
    const dataRes = (await axios.patch(`/v1/chuk/blog`, data)) as IRes<number[]>;
    return dataRes;
};

export const updateBlog = async (data: IBlog): Promise<IRes<number[]>> => {
    const dataRes = (await axios.put(`/v1/chuk/blog`, data)) as IRes<number[]>;
    return dataRes;
};
