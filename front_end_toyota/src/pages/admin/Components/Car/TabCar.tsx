import { Tabs } from 'antd';
import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import AddCarPage from './components/AddCar';
import AllCar from './components/AllCar';

export default function TabCar() {
    const key_tab_all = uuidv4();
    const key_tab_add = uuidv4();
    const TabComponents: {
        label: string;
        key: string;
        children: React.ReactNode;
    }[] = [
        {
            key: key_tab_all,
            label: 'Tất cả xe',
            children: <AllCar />,
        },
        {
            key: key_tab_add,
            label: 'Thêm xe',
            children: <AddCarPage />,
        },
    ];

    return (
        <>
            <Tabs
                defaultActiveKey="1"
                destroyInactiveTabPane
                size={'middle'}
                type="card"
                style={{ marginBottom: 32 }}
                items={TabComponents}
            />
        </>
    );
}
