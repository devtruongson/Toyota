import { Tabs } from 'antd';
import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import AddBlog from './components/AddBlog';
import AllBlog from './components/AllBlog';

const TabComponents: {
    label: string;
    key: string;
    children: React.ReactNode;
}[] = [
    {
        key: uuidv4(),
        label: 'Tất cả bài viết',
        children: <AllBlog key={uuidv4()} />,
    },
    {
        key: uuidv4(),
        label: 'Thêm mới bài viết',
        children: <AddBlog />,
    },
];

export default function TabBlog() {
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
