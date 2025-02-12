import { Avatar, Button, Input, Table } from 'antd';
import { HttpStatusCode } from 'axios';
import React, { useEffect, useState } from 'react';
import useDebounce from '../../../../../hooks/useDebounce';
import { searchUserService } from '../../../../../services/userService';
import { IUser } from '../../../../../utils/interface';
import ModalUser from './ModalUser';

const { Search } = Input;

const SearchUser: React.FC = () => {
    const [data, setData] = useState<IUser[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [userIdDetail, setUserIdDetail] = useState<number | null>(null);
    const [queryData, setQueryData] = useState('');

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const query = useDebounce(queryData, 700);

    const fetchData = async (query: string) => {
        setLoading(true);
        try {
            const res = await searchUserService(query);
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
        if (query) {
            fetchData(query);
        }
    }, [query]);

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
                setUserIdDetail(data.id);
                return (
                    <Button
                        type="primary"
                        onClick={() => {
                            setIsModalOpen(true);
                        }}
                    >
                        Xem thông tin
                    </Button>
                );
            },
        },
    ];

    return (
        <>
            {userIdDetail && isModalOpen && (
                <ModalUser user_id={userIdDetail} handleCancel={handleCancel} isModalOpen={isModalOpen} />
            )}
            <div className="max-w-lg mx-auto pb-4">
                <Search
                    onChange={(e) => {
                        setQueryData(e.target.value);
                    }}
                    placeholder="Nhập Ten, So Dien Thoai, Email, Dia Chi ..."
                    enterButton
                    loading={loading}
                />
            </div>
            <Table rowKey="id" dataSource={data} columns={columns} loading={loading} />
        </>
    );
};

export default SearchUser;
