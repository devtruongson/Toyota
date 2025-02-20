import { Button, Select, Table } from 'antd';
import { HttpStatusCode } from 'axios';
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { deleteBlogService, getAllBlogsAdmin, updateVisibleBlog } from '../../../../../services/blogService';
import { getAllCateActive } from '../../../../../services/cateService';
import { IBlog, ICar, ICate, IMeta } from '../../../../../utils/interface';
import ModalCofirmDelete from './ModalCofirmDelete';
import PostDetailModal from './ModalDetailBlog';
import ModalUpdateBlog from './ModalUpdateBlog';

const AllBlog = () => {
    const [data, setData] = useState<IBlog[]>([]);
    const [meta, setMeta] = useState<IMeta>({ currentPage: 1, totalIteams: 0, totalPages: 0 });
    const [loading, setLoading] = useState<boolean>(false);
    const [isActive, setIsActive] = useState<boolean | null>(null);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [isOpenUpdate, setIsOpenUpdate] = useState(false);
    const [blogView, setBlogView] = useState<IBlog | null>(null);
    const [allCate, setAllCate] = useState<ICate[]>([]);
    const [cateIdFilter, setIdCateFilter] = useState<number | 'null'>('null');

    const fetchDataCate = async () => {
        try {
            const res = await getAllCateActive();
            if (res.code === HttpStatusCode.Ok) {
                setAllCate(res.data);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const fetchData = async (page: number = 1) => {
        setLoading(true);
        try {
            const res = await getAllBlogsAdmin(
                page,
                5,
                typeof cateIdFilter !== 'string' ? cateIdFilter : undefined,
                typeof isActive === 'boolean' ? isActive : undefined,
            );
            if (res.code === HttpStatusCode.Ok) {
                setData(res.data.items);
                setMeta(res.data.meta);
            }
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
        fetchDataCate();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isActive]);

    const onChange = (value: boolean) => {
        setIsActive(value);
    };

    const handleDeleteBlog = async (id: number, title: string) => {
        if (!id) return;

        try {
            const res = await deleteBlogService(id);
            if (res.code === HttpStatusCode.Ok) {
                Swal.fire({
                    icon: 'success',
                    title: `Xóa thành công bài viết ${title}`,
                });
                const newData = [...data].filter((blog) => blog.id !== id);
                setData(newData);
            }
        } catch (error) {
            console.log(error);
            Swal.fire({
                icon: 'error',
                title: 'Error',
            });
        }
    };

    const carColumns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Tên bài viết',
            dataIndex: 'title',
            key: 'title',
        },
        {
            title: 'SEO Meta Description',
            dataIndex: 'meta_description',
            key: 'meta_description',
        },
        {
            title: 'Loại bài viết',
            dataIndex: 'cate_date',
            key: 'cate_date',
            render: (cate_date: ICate) => cate_date.title || '',
        },
        {
            title: 'Active',
            key: 'is_active',
            render: (data: ICar) => {
                return (
                    <Select
                        className="w-[100px]"
                        showSearch
                        optionFilterProp="label"
                        onChange={(value: boolean) => handleChangeValue(value, data.id)}
                        value={data.is_active}
                        options={[
                            {
                                value: true,
                                label: 'Hiển thị',
                            },
                            {
                                value: false,
                                label: 'Ẩn',
                            },
                        ]}
                    />
                );
            },
        },

        {
            title: 'Hành động',
            key: 'actions',
            render: (data: IBlog) => {
                return (
                    <div className="flex justify-center items-center gap-[4px]">
                        <ModalCofirmDelete
                            onDelete={() => handleDeleteBlog(data.id, data.title)}
                            title={data?.title || ''}
                        />
                        <Button
                            type="primary"
                            onClick={() => {
                                setBlogView(data);
                                setIsModalOpen(true);
                            }}
                        >
                            Xem thông tin
                        </Button>
                        <button
                            className="text-white bg-orange-400 rounded-[8px] px-[8px] py-[4px] hover:opacity-[0.7]"
                            onClick={() => {
                                setBlogView(data);
                                setIsOpenUpdate(true);
                            }}
                        >
                            Cập nhật
                        </button>
                    </div>
                );
            },
        },
    ];

    const handleChangeValue = (value: boolean, id: number) => {
        Swal.fire({
            text: 'Bạn chắc chắn muốn thay đổi?',
            icon: 'question',
            showCancelButton: true,
            showConfirmButton: true,
        }).then(async (res) => {
            if (res.isConfirmed) {
                try {
                    const res = await updateVisibleBlog({
                        id: id,
                        is_active: value,
                    });
                    if (res.code === HttpStatusCode.Ok) {
                        Swal.fire({
                            text: 'Bạn đã cập nhật thành công!',
                            icon: 'success',
                        });
                        fetchData();
                    }
                } catch (error) {
                    console.log(error);
                }
            }
        });
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    useEffect(() => {
        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [cateIdFilter]);

    return (
        <>
            {isModalOpen && blogView && (
                <PostDetailModal onCancel={handleCancel} post={blogView} visible={isModalOpen} />
            )}
            {isOpenUpdate && blogView && (
                <ModalUpdateBlog
                    _fetch={fetchData}
                    onCancel={() => {
                        setIsOpenUpdate(false);
                    }}
                    post={blogView}
                    visible={isOpenUpdate}
                />
            )}
            <div className="flex gap-6 items-center my-4">
                <Select
                    value={isActive}
                    className="w-[400px] h-[40px]"
                    style={{
                        height: 40,
                    }}
                    showSearch
                    optionFilterProp="label"
                    onChange={onChange}
                    options={[
                        {
                            value: null,
                            label: 'Tất cả bài viết',
                        },
                        {
                            value: true,
                            label: 'Hiện bài viết',
                        },
                        {
                            value: false,
                            label: 'Đã Bị Ẩn',
                        },
                    ]}
                />
                <select
                    onChange={(e) => {
                        setIdCateFilter(e.target.value === 'null' ? 'null' : parseInt(e.target.value));
                    }}
                    value={cateIdFilter}
                    className="bg-gray-50 border border-gray-300 w-[400px] h-[40px] text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                >
                    <option value="null">Tất cả loại bài viết</option>
                    {allCate.map((item) => (
                        <option value={item.id} key={item.id}>
                            {item.title}
                        </option>
                    ))}
                </select>
            </div>
            <div className="w-[100%] overflow-auto">
                <div className="">
                    {data && data.length > 0 ? (
                        <Table
                            rowKey="id"
                            dataSource={data}
                            columns={carColumns}
                            loading={loading}
                            pagination={{
                                current: meta.currentPage,
                                pageSize: 5,
                                total: meta.totalIteams,
                                onChange: (page: number) => fetchData(page),
                            }}
                        />
                    ) : null}
                </div>
            </div>
        </>
    );
};

export default AllBlog;
