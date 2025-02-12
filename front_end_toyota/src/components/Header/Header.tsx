import {
    DashboardOutlined,
    DownOutlined,
    FacebookOutlined,
    InstagramOutlined,
    LogoutOutlined,
    UserOutlined,
    YoutubeOutlined,
} from '@ant-design/icons';
import { Button, Dropdown, Menu, Popover } from 'antd';
import { useDispatch } from 'react-redux';
import slug from 'slug';
import Swal from 'sweetalert2';
import { useAppSelector } from '../../app/hooks';
import { logOutAction } from '../../app/slices/appSlice';
import processENV from '../../configs/process';

const Header = () => {
    const isLoginIn = useAppSelector((state) => state.auth.IsLoginIn);
    const user = useAppSelector((state) => state.auth.user);

    const menuProducts = (
        <Menu className="w-72 shadow-lg rounded-lg">
            <div className="grid grid-cols-2 gap-4 p-4">
                <div>
                    <h4 className="font-semibold text-gray-700 mb-2">ĐỘNG CƠ XĂNG</h4>
                    <Menu.Item key="1">VinFast Fadil</Menu.Item>
                    <Menu.Item key="2">VinFast Lux A2.0</Menu.Item>
                    <Menu.Item key="3">VinFast Lux SA2.0</Menu.Item>
                    <Menu.Item key="4">VinFast President</Menu.Item>
                </div>
                <div>
                    <h4 className="font-semibold text-gray-700 mb-2">ĐỘNG CƠ ĐIỆN</h4>
                    <Menu.Item key="5">VinFast VF 5</Menu.Item>
                    <Menu.Item key="6">VinFast VF 6</Menu.Item>
                    <Menu.Item key="7">VinFast VF E34</Menu.Item>
                    <Menu.Item key="8">VinFast VF 8</Menu.Item>
                    <Menu.Item key="9">VinFast VF 9</Menu.Item>
                </div>
            </div>
        </Menu>
    );

    const dispatch = useDispatch();
    const handleLogout = () => {
        Swal.fire({
            text: 'Bạn chắc chắn muốn đăng xuất!',
            icon: 'question',
            allowOutsideClick: false,
            showConfirmButton: true,
            showCancelButton: true,
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch(logOutAction());
            }
        });
    };

    const popoverContent = (
        <div className="flex flex-col space-y-2 px-6">
            <ul className="p-0 m-0">
                <li
                    onClick={() => {
                        window.location.href = '/me';
                    }}
                    className="cursor-pointer mb-4 flex items-center gap-2 hover:text-[#ee4d2d]"
                >
                    <UserOutlined />
                    Trang cá nhân
                </li>
                {user?.role === 'admin' && (
                    <li
                        onClick={() => {
                            window.location.href = '/dashboard/user';
                        }}
                        className="cursor-pointer flex items-center gap-2 mb-4 hover:text-[#ee4d2d]"
                    >
                        <DashboardOutlined />
                        Trang quản trị
                    </li>
                )}
                <li onClick={handleLogout} className="cursor-pointer flex items-center gap-2 hover:text-[#ee4d2d]">
                    <LogoutOutlined />
                    Đăng xuất
                </li>
            </ul>
        </div>
    );

    return (
        <header className="bg-white shadow-md">
            <div className="bg-[#1464f4] text-[#fff] py-2">
                <div className="container mx-auto flex justify-between items-center">
                    <ul className="p-0 m-0 flex gap-[20px]">
                        <li className="hover:text-[#ee4d2d] cursor-pointer">
                            <FacebookOutlined />
                        </li>
                        <li className="hover:text-[#ee4d2d] cursor-pointer">
                            <YoutubeOutlined />
                        </li>
                        <li className="hover:text-[#ee4d2d] cursor-pointer">
                            <InstagramOutlined />
                        </li>
                    </ul>
                    <ul className="flex items-center gap-[20px]">
                        <li className="cursor-pointer">Giới thiệu</li>
                        {!isLoginIn ? (
                            <>
                                <li className="cursor-pointer">
                                    <a href="/register">Đăng ký</a>
                                </li>
                                <li className="cursor-pointer">
                                    <a href="/login">Đăng nhập</a>
                                </li>
                            </>
                        ) : (
                            user && (
                                <>
                                    <li className="cursor-pointer flex">
                                        <Popover content={popoverContent} trigger="hover" placement="bottomRight">
                                            <a
                                                className="inline-flex items-center gap-2 cursor-pointer"
                                                href={`/profile/${user.id}?slug=${slug(
                                                    user.first_name + user.last_name + user.avatar,
                                                )}`}
                                            >
                                                <img
                                                    alt={user.first_name}
                                                    className="w-[30px] h-[30px] object-cover rounded-full"
                                                    src={
                                                        user.avatar?.startsWith('https://fstack.io.vn')
                                                            ? user.avatar
                                                            : `${process.env.VITE_URL_BACKEND}${user.avatar}`
                                                    }
                                                />
                                                <span>
                                                    {user.first_name} {user.last_name}
                                                </span>
                                            </a>
                                        </Popover>
                                    </li>
                                </>
                            )
                        )}
                    </ul>
                </div>
            </div>
            <div className="container mx-auto flex justify-between items-center p-4">
                {/* Logo */}
                <div className="flex items-center">
                    <a href="/">
                        <img
                            src={`${processENV.VITE_URL_BACKEND}/v1/upload/public/cropped-logo-vinfast-newway.jpg`}
                            alt="Logo"
                            className="h-12"
                        />
                    </a>
                </div>

                {/* Menu */}
                <nav>
                    <ul className="flex space-x-6 text-gray-700 font-medium">
                        <li>
                            <a href="#" className="hover:text-blue-600">
                                TRANG CHỦ
                            </a>
                        </li>
                        <li>
                            <a href="#" className="hover:text-blue-600">
                                GIỚI THIỆU
                            </a>
                        </li>
                        <li>
                            <Dropdown overlay={menuProducts}>
                                <a href="#" className="hover:text-blue-600 flex items-center">
                                    SẢN PHẨM <DownOutlined className="ml-1" />
                                </a>
                            </Dropdown>
                        </li>
                        <li>
                            <a href="#" className="hover:text-blue-600">
                                DỊCH VỤ
                            </a>
                        </li>
                        <li>
                            <a href="#" className="hover:text-blue-600">
                                BẢO HIỂM
                            </a>
                        </li>
                        <li>
                            <a href="#" className="hover:text-blue-600">
                                TIN TỨC - SỰ KIỆN
                            </a>
                        </li>
                    </ul>
                </nav>

                {/* Buttons */}
                <div className="flex space-x-4">
                    <Button type="primary" className="bg-blue-600 border-none hover:bg-blue-700">
                        LÁI THỬ
                    </Button>
                    <Button type="primary" className="bg-blue-600 border-none hover:bg-blue-700">
                        ĐẶT XE ONLINE
                    </Button>
                </div>
            </div>
        </header>
    );
};

export default Header;
