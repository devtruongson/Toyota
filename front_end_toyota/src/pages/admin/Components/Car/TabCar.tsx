import { Tabs } from 'antd';
import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import AddCarPage from './components/AddCar';
import AllCar from './components/AllCar';

const TabComponents: {
    label: string;
    key: string;
    children: React.ReactNode;
}[] = [
    {
        key: uuidv4(),
        label: 'Tất cả xe',
        children: <AllCar />,
    },
    {
        key: uuidv4(),
        label: 'Thêm xe',
        children: <AddCarPage />,
    },
];

export default function TabCar() {
    return (
        <>
            <Tabs defaultActiveKey="1" size={'middle'} type="card" style={{ marginBottom: 32 }} items={TabComponents} />
        </>
    );
}
