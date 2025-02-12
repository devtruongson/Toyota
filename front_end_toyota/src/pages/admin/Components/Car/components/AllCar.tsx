import { Button, Select, Table } from 'antd';
import { HttpStatusCode } from 'axios';
import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { changeVisibleCarService, getAllCar } from '../../../../../services/carService';
import { ICar, ICarFeature, IMeta } from '../../../../../utils/interface';
import ModalCar from './ModelCar';

const AllCar: React.FC = () => {
    const [data, setData] = useState<ICar[]>([]);
    const [meta, setMeta] = useState<IMeta>({ currentPage: 1, totalIteams: 0, totalPages: 0 });
    const [loading, setLoading] = useState<boolean>(false);
    const [isActive, setIsActive] = useState<boolean | string>(true);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [carIdView, setCarIdView] = useState<number | null>(null);

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
    }, [isActive]);

    const onChange = (value: boolean) => {
        setIsActive(value);
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
            title: 'Features',
            dataIndex: 'car_features',
            key: 'car_features',
            render: (features: ICarFeature[]) => (
                <div>
                    {features &&
                        features.map((feature) => (
                            <img
                                key={feature.id}
                                src={feature.image_url}
                                alt={feature.color}
                                className="w-[50px] object-cover h-[50px] mr-[10px] rounded-sm"
                            />
                        ))}
                </div>
            ),
        },
        {
            title: 'Hành động',
            key: 'actions',
            render: (data: ICar) => {
                return (
                    <Button
                        type="primary"
                        onClick={() => {
                            setCarIdView(data.id);
                            setIsModalOpen(true);
                        }}
                    >
                        Xem thông tin
                    </Button>
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
                </div>
            </div>
        </>
    );
};

export default AllCar;
