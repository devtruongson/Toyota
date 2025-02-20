import { Table } from 'antd';
import { HttpStatusCode } from 'axios';
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { changeStatusFormService, getAllRegisterForm } from '../../../../services/registerFormService';
import { ICar, IRegisterForm, IUser } from '../../../../utils/interface';

export default function BookingTablePage() {
    const [data, setData] = useState<IRegisterForm[]>([]);
    const [filter, setFilter] = useState<'BOOK_DEMO' | 'TEST_DRIVE'>('BOOK_DEMO');
    const _fetch = async () => {
        try {
            const res = await getAllRegisterForm(filter);
            if (res.code === HttpStatusCode.Ok) {
                setData(res.data);
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        _fetch();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filter]);

    const handleChange = async (e: React.ChangeEvent<HTMLSelectElement>, id: number) => {
        const newStatus = e.target.value === 'true';
        console.log(newStatus, id);
        try {
            const res = await changeStatusFormService({
                id_form: id,
                status: newStatus,
            });
            if (res.code === HttpStatusCode.Ok) {
                Swal.fire({
                    text: 'Bạn đã cập nhật thành công',
                });
                _fetch();
            }
        } catch (error) {
            console.log(error);
        }
    };

    // Định nghĩa cột cho bảng
    const columns = [
        {
            title: 'Họ Tên',
            dataIndex: 'user_data',
            key: 'fullName',
            render: (user_data: IUser) => (user_data ? `${user_data.first_name} ${user_data.last_name}` : ''),
        },
        {
            title: 'Số điện thoại',
            dataIndex: 'user_data',
            key: 'phone',
            render: (user_data: IUser) => user_data?.phone_number || '',
        },
        {
            title: 'Trạng thái',
            key: 'status',
            render: (item: IRegisterForm) => (
                <select
                    value={String(item.status)}
                    onChange={(e) => {
                        handleChange(e, item.id);
                    }}
                    className="bg-gray-50 border mb-5 border-gray-300 w-[400px] text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
                >
                    <option value="true">Đã xử lý</option>
                    <option value="false">Chưa xử lý</option>
                </select>
            ),
        },
        {
            title: 'Ghi chú',
            dataIndex: 'note',
            key: 'note',
        },
        {
            title: 'Tên xe',
            dataIndex: 'car_data',
            key: 'carTitle',
            render: (car_data: ICar) => car_data?.title || '',
        },
    ];

    return (
        <div className="p-4">
            <h1 className="text-xl font-bold mb-4">
                {filter === 'BOOK_DEMO' ? 'Danh sách đặt xe online' : 'Danh sách đăng ký lái thử'}
            </h1>
            <label htmlFor="filterSelect" className="sr-only">
                Filter
            </label>
            <select
                value={filter}
                onChange={(e) => setFilter(e.target.value as 'BOOK_DEMO' | 'TEST_DRIVE')}
                id="filterSelect"
                className="bg-gray-50 border mb-5 border-gray-300 w-[400px] text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
                <option value="BOOK_DEMO">Danh sách đặt xe online</option>
                <option value="TEST_DRIVE">Danh sách đăng ký lái thử</option>
            </select>
            <Table columns={columns} dataSource={data} rowKey="id" className="bg-white shadow-sm" />
        </div>
    );
}
