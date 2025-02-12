import { Avatar, Button, Select, Table } from 'antd';
import { HttpStatusCode } from 'axios';
import React, { useEffect, useState } from 'react';
import { getAllUser } from '../../../../../services/userService';
import { IMeta, IUser } from '../../../../../utils/interface';
import ModalUser from './ModalUser';

const AllUser: React.FC = () => {
    const [data, setData] = useState<IUser[]>([]);
    const [meta, setMeta] = useState<IMeta>({ currentPage: 1, totalIteams: 0, totalPages: 0 });
    const [loading, setLoading] = useState<boolean>(false);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [userIdDetail, setUserIdDetail] = useState<number | null>(null);
    const [roleFilter, setRoleFilter] = useState<string>('user');

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const fetchData = async (page: number = 1) => {
        setLoading(true);
        try {
            const res = await getAllUser(page, 10, roleFilter);
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
    }, [roleFilter]);

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Avatar',
            dataIndex: 'avatar',
            key: 'avatar',
            render: (avatar: string) => <Avatar src={avatar} />,
        },
        {
            title: 'First Name',
            dataIndex: 'first_name',
            key: 'first_name',
        },
        {
            title: 'Last Name',
            dataIndex: 'last_name',
            key: 'last_name',
        },
        {
            title: 'Role',
            dataIndex: 'role',
            key: 'role',
        },
        {
            title: 'Address',
            dataIndex: 'address_detail',
            key: 'address_detail',
        },
        {
            title: 'Phone Number',
            dataIndex: 'phone_number',
            key: 'phone_number',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Tạo tài khoản lúc',
            dataIndex: 'createdAt',
            key: 'createdAt',
            render: (date: string) => new Date(date).toLocaleString(),
        },
        {
            title: 'Hành động',
            key: 'actions',
            render: (data: IUser) => {
                return (
                    <Button
                        type="primary"
                        onClick={() => {
                            setUserIdDetail(data.id);
                            setIsModalOpen(true);
                        }}
                    >
                        Xem thông tin
                    </Button>
                );
            },
        },
    ];

    const onChange = (value: string) => {
        setRoleFilter(value);
    };

    return (
        <>
            {userIdDetail && isModalOpen && (
                <ModalUser user_id={userIdDetail} handleCancel={handleCancel} isModalOpen={isModalOpen} />
            )}
            <Select
                style={{
                    marginBottom: 10,
                }}
                showSearch
                defaultValue={'user'}
                optionFilterProp="label"
                onChange={onChange}
                options={[
                    {
                        value: 'user',
                        label: 'Quyền User',
                    },
                    {
                        value: 'admin',
                        label: 'Quyền Admin',
                    },
                ]}
            />
            <Table
                rowKey="id"
                dataSource={data}
                columns={columns}
                loading={loading}
                pagination={{
                    current: meta.currentPage,
                    pageSize: 10,
                    total: meta.totalIteams,
                    onChange: (page: number) => fetchData(page),
                }}
            />
        </>
    );
};

export default AllUser;
