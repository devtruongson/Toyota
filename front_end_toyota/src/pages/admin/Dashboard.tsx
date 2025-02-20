import { LaptopOutlined, UserOutlined } from '@ant-design/icons';
import { Menu, MenuProps } from 'antd';
import Layout, { Content } from 'antd/es/layout/layout';
import Sider from 'antd/es/layout/Sider';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import RouterDashBoard from './RouterDashboard/RouterDashBoard';

const menuNav: MenuProps['items'] = [
    {
        icon: UserOutlined,
        title: 'Quản lý người dùng',
        url: 'user',
    },
    {
        icon: LaptopOutlined,
        title: 'Quản lí xe',
        url: 'car',
    },
    {
        icon: LaptopOutlined,
        title: 'Quản lí form',
        url: 'form',
    },
    {
        icon: LaptopOutlined,
        title: 'Quản lí trạm sạc',
        url: 'charging',
    },
].map((item) => {
    return {
        key: item.url,
        icon: React.createElement(item.icon),
        label: item.title,
    };
});

export default function Dashboard() {
    const history = useNavigate();

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleClickMenuDashBoard = (data: any) => {
        const url = '/dashboard/' + data.key;
        history(url);
    };

    return (
        <div className="h-[100vh]">
            <Layout style={{ background: '#fff', borderRadius: 10, height: '100%' }}>
                <Sider style={{ background: '#fff' }} width={200}>
                    <Menu
                        onClick={handleClickMenuDashBoard}
                        mode="inline"
                        defaultSelectedKeys={['user']}
                        defaultOpenKeys={['user']}
                        style={{ height: '100%' }}
                        items={menuNav}
                    />
                </Sider>
                <Content style={{ padding: '30px 24px', minHeight: 280 }}>
                    <RouterDashBoard />
                </Content>
            </Layout>
        </div>
    );
}
