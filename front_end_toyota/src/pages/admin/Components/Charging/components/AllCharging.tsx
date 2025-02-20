import { Button, Table } from 'antd';
import { HttpStatusCode } from 'axios';
import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import {
    deleteChargingService,
    getAllChargingService,
    updateChargingService,
} from '../../../../../services/chargingService';
import { ICharging } from '../../../../../utils/interface';
import EditModal from './ModelUpdateCharging';

const AllCharging: React.FC = () => {
    const [data, setData] = useState<ICharging[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [chargingUpdate, setChargingUpdate] = useState<ICharging | null>(null);

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const fetchData = async () => {
        setLoading(true);
        try {
            const res = await getAllChargingService();
            if (res.code === HttpStatusCode.Ok) {
                setData(res.data);
            }
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Tên chạm sạc',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Vị trí trạm sạc',
            key: 'location',
            render: (data: ICharging) => {
                return (
                    <iframe
                        title="Charging Station Location"
                        className="w-[100%] h-[300px] rounded-2xl overflow-hidden"
                        src={data.location}
                        height="450"
                        loading="lazy"
                    ></iframe>
                );
            },
        },
        {
            title: 'Hành động',
            key: 'actions',
            render: (data: ICharging) => {
                return (
                    <div className="flex gap-2">
                        <Button
                            type="primary"
                            onClick={() => {
                                setChargingUpdate(data);
                                setIsModalOpen(true);
                            }}
                        >
                            Sửa Charging
                        </Button>
                        <Button
                            type="dashed"
                            onClick={() => {
                                handleDeleteCharging(data.id);
                            }}
                        >
                            Xóa Charging
                        </Button>
                    </div>
                );
            },
        },
    ];

    const handleDeleteCharging = async (id: number) => {
        try {
            Swal.fire({
                text: 'Bạn có chắc chắn muốn xóa',
                icon: 'warning',
                showConfirmButton: true,
                showCancelButton: true,
            }).then(async (res) => {
                if (res.isConfirmed) {
                    const res = await deleteChargingService(id);
                    if (res.code === HttpStatusCode.Ok) {
                        Swal.fire({
                            text: 'Xóa thành công!',
                        });
                        fetchData();
                    }
                }
            });
        } catch (error) {
            console.log(error);
        }
    };

    const handleSubmitUpdate = async (value: { name: string; location: string; power_kw: string }) => {
        if (!chargingUpdate) return;

        try {
            const res = await updateChargingService({
                id: chargingUpdate.id,
                ...value,
            });

            if (res.code === HttpStatusCode.Ok) {
                Swal.fire({
                    text: 'Cập nhật thành công!',
                });
                fetchData();
                setChargingUpdate(null);
                setIsModalOpen(false);
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            {isModalOpen && chargingUpdate && (
                <EditModal
                    onCancel={handleCancel}
                    visible={isModalOpen}
                    onSave={handleSubmitUpdate}
                    initialValues={{
                        location: chargingUpdate.location,
                        name: chargingUpdate.name,
                        power_kw: chargingUpdate.power_kw,
                    }}
                />
            )}
            <Table rowKey="id" dataSource={data} columns={columns} loading={loading} />
        </>
    );
};

export default AllCharging;
