import { Tabs } from 'antd';
import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import AllUser from './components/AllUser';
import SearchUser from './components/SearchUser';

const TabComponents: {
    label: string;
    key: string;
    children: React.ReactNode;
}[] = [
    {
        key: uuidv4(),
        label: 'Tất cả người dùng',
        children: <AllUser />,
    },
    {
        key: uuidv4(),
        label: 'Tìm kiếm người dùng',
        children: <SearchUser />,
    },
];

export default function TabUser() {
    return (
        <>
            <Tabs defaultActiveKey="1" size={'middle'} type="card" style={{ marginBottom: 32 }} items={TabComponents} />
        </>
    );
}
