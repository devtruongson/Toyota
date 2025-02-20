import { LaptopOutlined, LoginOutlined, SwapOutlined, UserOutlined, VerticalAlignTopOutlined } from '@ant-design/icons';
import { Menu, MenuProps, Tooltip } from 'antd';
import Layout, { Content } from 'antd/es/layout/layout';
import Sider from 'antd/es/layout/Sider';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ModalEmailMarketing from './Components/EmailMarketing/EmailMarketing';
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
        icon: LoginOutlined,
        title: 'Quản lí form',
        url: 'form',
    },
    {
        icon: SwapOutlined,
        title: 'Quản lý bài viết',
        url: 'blog',
    },
    {
        icon: VerticalAlignTopOutlined,
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
    const [isOpen, setIsOpen] = useState<boolean>(false);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleClickMenuDashBoard = (data: any) => {
        const url = '/dashboard/' + data.key;
        history(url);
    };

    useEffect(() => {
        if (!document) return;
        const header = document.querySelector('header');
        if (header && header.style) {
            header.style.display = 'none';
        }
    }, []);

    const handleModal = (status: boolean) => {
        setIsOpen(status);
    };

    return (
        <>
            {isOpen && (
                <ModalEmailMarketing
                    onCancel={() => {
                        handleModal(false);
                    }}
                    visible={isOpen}
                />
            )}
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
                <a href="/" className="fixed bottom-[30px] left-[30px] bg-amber-200 px-6 py-2 rounded-[99999px]">
                    Quay về
                </a>
                <Tooltip title="Gửi mail marketing">
                    <button
                        onClick={() => {
                            handleModal(!isOpen);
                        }}
                        className="fixed bottom-[90px] cursor-pointer hover:opacity-[0.8] left-[50px]"
                    >
                        <img
                            src="https://cdn0.iconfinder.com/data/icons/apple-apps/100/Apple_Mail-512.png"
                            className="w-[50px] h-[50px] object-contain"
                            alt=""
                        />
                    </button>
                </Tooltip>
            </div>
        </>
    );
}
