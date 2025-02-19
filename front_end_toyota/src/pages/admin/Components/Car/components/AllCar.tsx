import { Button, Select, Table } from 'antd';
import { HttpStatusCode } from 'axios';
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { changeVisibleCarService, deleteCar, getAllCar } from '../../../../../services/carService';
import { ICar, IMeta } from '../../../../../utils/interface';
import ModalCar from './ModelCar';
import ModalCofirmDelete from './ModalCofirmDelete';
import ModalUpdateCar from './ModalUpdateCar';

const AllCar = () => {
    const [data, setData] = useState<ICar[]>([]);
    const [meta, setMeta] = useState<IMeta>({ currentPage: 1, totalIteams: 0, totalPages: 0 });
    const [loading, setLoading] = useState<boolean>(false);
    const [isActive, setIsActive] = useState<boolean | string>(true);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [isOpenUpdate, setIsOpenUpdate] = useState(false);
    const [carIdView, setCarIdView] = useState<number | null>(null);
    const [isReload, setIsReload] = useState(false);

    const fetchData = async (page: number = 1) => {
        setLoading(true);
        try {
            const res = await getAllCar(page, 5, isActive);
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
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isActive, isReload]);

    const onChange = (value: boolean) => {
        setIsActive(value);
    };

    const handleDeleteCar = async (id: number, title: string) => {
        if (!id) return;

        try {
            const res = await deleteCar(id);
            if (res.code === HttpStatusCode.Ok) {
                Swal.fire({
                    icon: 'success',
                    title: `Xóa thành công xe ${title}`,
                });
                const newData = [...data].filter((car) => car.id !== id);
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
            title: 'Title',
            dataIndex: 'title',
            key: 'title',
        },
        {
            title: 'Meta Sub Title',
            dataIndex: 'meta_sub_title',
            key: 'meta_sub_title',
        },
        {
            title: 'Show Form',
            dataIndex: 'is_show_form',
            key: 'is_show_form',
            render: (is_show_form: boolean) => {
                return is_show_form ? 'Hiển thị' : 'Ẩn';
            },
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
            render: (data: ICar) => {
                return (
                    <div className="flex justify-center items-center gap-[4px]">
                        <ModalCofirmDelete
                            onDelete={() => handleDeleteCar(data.id, data.title)}
                            title={data?.title || ''}
                        />
                        <Button
                            type="primary"
                            onClick={() => {
                                setCarIdView(data.id);
                                setIsModalOpen(true);
                            }}
                        >
                            Xem thông tin
                        </Button>
                        <button
                            className="text-white bg-orange-400 rounded-[8px] px-[8px] py-[4px] hover:opacity-[0.7]"
                            onClick={() => {
                                setCarIdView(data.id);
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

    const handleChangeValue = (value: boolean, car_id: number) => {
        Swal.fire({
            text: 'Bạn chắc chắn muốn thay đổi?',
            icon: 'question',
            showCancelButton: true,
            showConfirmButton: true,
        }).then(async (res) => {
            if (res.isConfirmed) {
                try {
                    const res = await changeVisibleCarService({
                        car_id: car_id,
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

    return (
        <>
            {carIdView && isModalOpen && (
                <ModalCar car_id={carIdView} handleCancel={handleCancel} isModalOpen={isModalOpen} />
            )}
            {carIdView && isOpenUpdate && (
                <ModalUpdateCar
                    car_id={carIdView}
                    handleCancel={() => setIsOpenUpdate(false)}
                    isModalOpen={isOpenUpdate}
                    onReload={() => setIsReload(!isReload)}
                />
            )}
            <Select
                style={{
                    marginBottom: 10,
                }}
                showSearch
                defaultValue={true}
                optionFilterProp="label"
                onChange={onChange}
                options={[
                    {
                        value: 'all',
                        label: 'Tất cả sản phẩm',
                    },
                    {
                        value: true,
                        label: 'Hiện Sản Phẩm',
                    },
                    {
                        value: false,
                        label: 'Đã Bị Ẩn',
                    },
                ]}
            />
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

export default AllCar;
