import { Tabs } from 'antd';
import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import AddCharging from './components/Addcharging';
import AllCharging from './components/AllCharging';

const TabComponents: {
    label: string;
    key: string;
    children: React.ReactNode;
}[] = [
    {
        key: uuidv4(),
        label: 'Tất cả trạm sạc',
        children: <AllCharging key={uuidv4()} />,
    },
    {
        key: uuidv4(),
        label: 'Thêm chạm sạc',
        children: <AddCharging />,
    },
];

export default function TabCharging() {
    return (
        <>
            <Tabs
                defaultActiveKey="1"
                size={'middle'}
                destroyInactiveTabPane
                type="card"
                style={{ marginBottom: 32 }}
                items={TabComponents}
            />
        </>
    );
}
