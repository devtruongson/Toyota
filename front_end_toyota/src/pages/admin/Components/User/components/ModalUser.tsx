import { Avatar, Card, Descriptions, Modal, Table } from 'antd';
import { HttpStatusCode } from 'axios';
import { useEffect, useState } from 'react';
import { getOneUser } from '../../../../../services/userService';
import { IOrder, IUser } from '../../../../../utils/interface';

export default function ModalUser({
    handleCancel,
    isModalOpen,
    user_id,
}: {
    user_id: number;
    isModalOpen: boolean;
    handleCancel: () => void;
}) {
    const [userData, setUserData] = useState<IUser | null>(null);

    useEffect(() => {
        const _fetch = async () => {
            try {
                const res = await getOneUser(user_id);
                if (res.code === HttpStatusCode.Ok) {
                    setUserData(res.data);
                }
            } catch (error) {
                console.log(error);
            }
        };
        _fetch();
    }, [user_id]);

    const columns = [
        {
            title: 'Order ID',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Tiêu đề',
            key: 'title',
            render: (data: IOrder) => {
                return (
                    <strong
                        className="cursor-pointer hover:text-[#ee4d2d]"
                        onClick={() => {
                            window.location.href = `/product/${data.id}`;
                        }}
                    >
                        {data.title}
                    </strong>
                );
            },
        },
        {
            title: 'Ngày đặt hàng',
            dataIndex: 'order_date',
            key: 'order_date',
            render: (date: string) =>
                // Giả sử order_date được lưu dưới dạng timestamp (giây)
                new Date(Number(date) * 1000).toLocaleString(),
        },
        {
            title: 'Trạng thái',
            dataIndex: 'status',
            key: 'status',
        },
        {
            title: 'Ngày tạo',
            dataIndex: 'createdAt',
            key: 'createdAt',
            render: (date: string) => new Date(date).toLocaleString(),
        },
    ];

    return (
        <Modal
            className="w-[60vw]"
            title="Thông tin người dùng"
            open={isModalOpen}
            footer={null}
            onCancel={handleCancel}
            width={'60vw'}
        >
            {userData && (
                <div className="h-[70vh] overflow-auto">
                    <Card style={{ marginBottom: '20px' }}>
                        <Descriptions title="Thông tin người dùng" bordered layout="vertical">
                            <Descriptions.Item label="ID">{userData.id}</Descriptions.Item>
                            <Descriptions.Item label="Họ">{userData.first_name}</Descriptions.Item>
                            <Descriptions.Item label="Tên">{userData.last_name}</Descriptions.Item>
                            <Descriptions.Item label="Vai trò">{userData.role}</Descriptions.Item>
                            <Descriptions.Item label="Địa chỉ">{userData.address_detail}</Descriptions.Item>
                            <Descriptions.Item label="Số điện thoại">{userData.phone_number}</Descriptions.Item>
                            <Descriptions.Item label="Mã">{userData.code}</Descriptions.Item>
                            <Descriptions.Item label="Email">{userData.email}</Descriptions.Item>
                            <Descriptions.Item label="Login Social">
                                {userData.is_login_social ? 'Có' : 'Không'}
                            </Descriptions.Item>
                            <Descriptions.Item label="Ngày tạo">
                                {new Date(userData.createdAt).toLocaleString()}
                            </Descriptions.Item>
                            <Descriptions.Item label="Ngày cập nhật">
                                {new Date(userData.updatedAt).toLocaleString()}
                            </Descriptions.Item>
                        </Descriptions>
                        <div className="mt-[20px] text-center">
                            <Avatar size={64} src={userData.avatar} />
                        </div>
                    </Card>

                    <Card title="Danh sách đơn hàng">
                        <Table rowKey="id" dataSource={userData.order_list} columns={columns} />
                    </Card>
                </div>
            )}
        </Modal>
    );
}
