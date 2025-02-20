import httpStatus from 'http-status';
import { CreateBlogDTO } from '~/dtos/CreateBlog.dto';
import { CreateCateDTO } from '~/dtos/CreateCate.dto';
import { UpdateCateDTO } from '~/dtos/UpdateCate.dto';
import { VisibleDTO } from '~/dtos/Visible.dto';
import Blog from '~/models/Blog';
import Cate from '~/models/Cate';
import { ResponseHandler } from '~/utils/Response';

class ChukService {
    async handleCreateCate(data: CreateCateDTO) {
        try {
            const cate = await Cate.create({
                ...data,
            });
            return ResponseHandler(httpStatus.OK, cate, 'Create cate Successfully');
        } catch (err) {
            console.log(err);
            Promise.reject(ResponseHandler(httpStatus.BAD_GATEWAY, null, 'có lỗi xảy ra!'));
        }
    }

    async handleCreateBlog(data: CreateBlogDTO) {
        try {
            const blog = await Blog.create({
                ...data,
            });
            return ResponseHandler(httpStatus.OK, blog, 'Create Blog Successfully');
        } catch (err) {
            console.log(err);
            Promise.reject(ResponseHandler(httpStatus.BAD_GATEWAY, null, 'có lỗi xảy ra!'));
        }
    }

    async handleUpdateCate(data: UpdateCateDTO) {
        try {
            const cate = await Cate.update(
                {
                    ...data,
                },
                {
                    where: {
                        id: data.id,
                    },
                },
            );
            return ResponseHandler(httpStatus.OK, cate, 'Update cate Successfully');
        } catch (err) {
            console.log(err);
            Promise.reject(ResponseHandler(httpStatus.BAD_GATEWAY, null, 'có lỗi xảy ra!'));
        }
    }

    async handleUpdateBlog(data: UpdateCateDTO) {
        try {
            const blog = await Blog.update(
                {
                    ...data,
                },
                {
                    where: {
                        id: data.id,
                    },
                },
            );
            return ResponseHandler(httpStatus.OK, blog, 'Update blog Successfully');
        } catch (err) {
            console.log(err);
            Promise.reject(ResponseHandler(httpStatus.BAD_GATEWAY, null, 'có lỗi xảy ra!'));
        }
    }

    async handleUpdateVisibleBlog(data: VisibleDTO) {
        try {
            const blog = await Blog.update(
                {
                    is_active: data.is_active,
                },
                {
                    where: {
                        id: data.id,
                    },
                },
            );
            return ResponseHandler(httpStatus.OK, blog, 'Update Visible blog Successfully');
        } catch (err) {
            console.log(err);
            Promise.reject(ResponseHandler(httpStatus.BAD_GATEWAY, null, 'có lỗi xảy ra!'));
        }
    }

    async handleUpdateVisibleCate(data: VisibleDTO) {
        try {
            const blog = await Cate.update(
                {
                    is_active: data.is_active,
                },
                {
                    where: {
                        id: data.id,
                    },
                },
            );
            return ResponseHandler(httpStatus.OK, blog, 'Update Visible Cate Successfully');
        } catch (err) {
            console.log(err);
            Promise.reject(ResponseHandler(httpStatus.BAD_GATEWAY, null, 'có lỗi xảy ra!'));
        }
    }

    async handleGetAllCate(is_acive: boolean) {
        try {
            const cate = await Cate.findAll({
                where: {
                    is_active: is_acive,
                },
                attributes: {
                    exclude: ['updatedAt', 'createdAt'],
                },
            });
            return ResponseHandler(httpStatus.OK, cate, 'ok');
        } catch (err) {
            console.log(err);
            Promise.reject(ResponseHandler(httpStatus.BAD_GATEWAY, null, 'có lỗi xảy ra!'));
        }
    }

    async handleGetOneCate(id: number) {
        try {
            const cate = await Cate.findOne({
                where: {
                    id: id,
                },
                include: [
                    {
                        model: Blog,
                        as: 'blog_list',
                    },
                ],
            });
            return ResponseHandler(httpStatus.OK, cate, 'ok');
        } catch (err) {
            console.log(err);
            Promise.reject(ResponseHandler(httpStatus.BAD_GATEWAY, null, 'có lỗi xảy ra!'));
        }
    }

    async getDetailBlog(id: number) {
        try {
            const blog = await Blog.findOne({
                where: {
                    id: id,
                },
                include: [
                    {
                        model: Cate,
                        as: 'cate_date',
                    },
                ],
            });
            return ResponseHandler(httpStatus.OK, blog, 'ok');
        } catch (err) {
            console.log(err);
            Promise.reject(ResponseHandler(httpStatus.BAD_GATEWAY, null, 'có lỗi xảy ra!'));
        }
    }

    async handleDeleteBlog(id: number) {
        try {
            const blog = await Blog.destroy({
                where: {
                    id: id,
                },
            });
            return ResponseHandler(httpStatus.OK, blog, 'ok');
        } catch (err) {
            console.log(err);
            Promise.reject(ResponseHandler(httpStatus.BAD_GATEWAY, null, 'có lỗi xảy ra!'));
        }
    }

    async handleGetAllBlog(data: { page: number; pageSize: number; cateId: number; is_active?: boolean }) {
        try {
            let offset: number = (data.page - 1) * data.pageSize;
            let whereCondition: any = {};

            if (typeof data.is_active !== 'undefined') {
                whereCondition['is_active'] = data.is_active;
            }

            if (data.cateId) {
                whereCondition['cate_id'] = data.cateId;
            }

            let { count, rows }: { count: number; rows: any } = await Blog.findAndCountAll({
                where: {
                    ...whereCondition,
                },
                include: [
                    {
                        model: Cate,
                        as: 'cate_date',
                    },
                ],
                offset: offset,
                limit: +data.pageSize,
            });

            let resData = {
                items: rows,
                meta: {
                    currentPage: data.page,
                    totalIteams: count,
                    totalPages: Math.ceil(count / data.pageSize),
                },
            };
            return ResponseHandler(httpStatus.OK, resData, 'ok');
        } catch (err) {
            console.log(err);
            Promise.reject(ResponseHandler(httpStatus.BAD_GATEWAY, null, 'có lỗi xảy ra!'));
        }
    }
}

export default new ChukService();
