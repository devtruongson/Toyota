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
import { HttpStatusCode } from 'axios';
import { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { logOutAction, saveCarActive, saveCate, saveCurrentcar } from '../../app/slices/appSlice';
import processENV from '../../configs/process';
import { naviHeader } from '../../constants';
import { routes } from '../../constants/routes';
import { formatLink } from '../../helpers/formatLink';
import { getAllCar } from '../../services/carService';
import { getAllCateActive } from '../../services/cateService';
import { ICar } from '../../utils/interface';
import BookCarModal from './ModalCar';

const Header = () => {
    const isLoginIn = useAppSelector((state) => state.auth.IsLoginIn);
    const user = useAppSelector((state) => state.auth.user);
    const cates = useAppSelector((state) => state.cates);
    const [cars, setCars] = useState<ICar[]>([]);
    const [visible, setVisible] = useState(false);

    const handleOpen = () => {
        setVisible(true);
    };

    // Đóng modal
    const handleClose = () => {
        setVisible(false);
    };

    const dispatch = useAppDispatch();

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

    useEffect(() => {
        const fetch = async () => {
            const [resCate, resCar] = await Promise.all([getAllCateActive(), getAllCar(1, 30, true)]);
            if (resCate.code === HttpStatusCode.Ok) {
                dispatch(
                    saveCate(
                        resCate.data.map((item) => {
                            return { ...item, path: formatLink(item.title) };
                        }),
                    ),
                );
            }
            if (resCar.code === HttpStatusCode.Ok) {
                dispatch(saveCarActive(resCar.data.items));
            }
        };

        fetch();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <header className="bg-white shadow-md z-[99] relative header-main">
            <BookCarModal handleClose={handleClose} visible={visible} />
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
                                                href={`/profile/${user.id}`}
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
                            <a href={routes.home} className="hover:text-blue-600">
                                TRANG CHỦ
                            </a>
                        </li>
                        <li>
                            <Dropdown overlay={<PoppverCommon data={naviHeader} />} className="">
                                <p>
                                    GIỚI THIỆU <DownOutlined className="ml-1 " />
                                </p>
                            </Dropdown>
                        </li>
                        <li>
                            <Dropdown overlay={<PoppverCars />}>
                                <Link to={routes.products} className="hover:text-blue-600 flex items-center">
                                    SẢN PHẨM <DownOutlined className="ml-1" />
                                </Link>
                            </Dropdown>
                        </li>
                        {cates &&
                            cates.map((cate) => {
                                return (
                                    <Link to={`/blogs/${cate.path}`} key={cate.id}>
                                        <li key={cate.id} className="uppercase hover:text-blue-600">
                                            {cate.title}
                                        </li>
                                    </Link>
                                );
                            })}
                        <li>
                            <Link to={`/chargings`}>TRẠM SẠC</Link>
                        </li>
                    </ul>
                </nav>

                {/* Buttons */}
                <div className="flex space-x-4">
                    <Button
                        onClick={() => (window.location.href = '/test-drive')}
                        type="primary"
                        className="bg-blue-600 border-none hover:bg-blue-700"
                    >
                        LÁI THỬ
                    </Button>
                    <Button
                        onClick={() => {
                            if (isLoginIn) {
                                handleOpen();
                            } else {
                                window.location.href = '/login';
                            }
                        }}
                        type="primary"
                        className="bg-blue-600 border-none hover:bg-blue-700"
                    >
                        ĐẶT XE ONLINE
                    </Button>
                </div>
            </div>
        </header>
    );
};

export default Header;

type PoppverCommonProps = {
    data: { title: string; link: string; id?: number }[];
};
const PoppverCommon = ({ data }: PoppverCommonProps) => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const handleNavigate = (link: string, id?: number) => {
        if (id) {
            dispatch(saveCurrentcar(id));
        }
        navigate(link);
    };

    return (
        <Menu className="w-72 shadow-lg rounded-lg " style={{ background: 'white', padding: '0' }}>
            <div className="bg-white">
                <div className="bg-white">
                    {data && data.length > 0
                        ? data.map((item) => {
                              return (
                                  <Menu.Item
                                      key="1"
                                      className="py-[20px]"
                                      style={{
                                          background: 'white',
                                          paddingLeft: '10px',
                                          paddingTop: '10px',
                                          paddingBottom: '10px',
                                          border: '1px solid #f4f4f4',
                                      }}
                                      onClick={() => handleNavigate(item.link, item.id)}
                                  >
                                      {item.title}
                                  </Menu.Item>
                              );
                          })
                        : null}
                </div>
            </div>
        </Menu>
    );
};

const PoppverCars = () => {
    const { carActive } = useAppSelector((state) => state);
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const handleNavigate = (link: string, id?: number) => {
        if (id) {
            dispatch(saveCurrentcar(id));
        }
        navigate(link);
    };
    const cars = useMemo(() => {
        const newCar = carActive.map((item) => {
            return { ...item, link: '/san-pham/' + formatLink(item.title) };
        });
        return {
            electric: newCar.filter((item) => item.model === 'electric'),
            gasoline: newCar.filter((item) => item.model !== 'electric'),
        };
    }, [carActive]);
    return (
        <Menu className="w-72 shadow-lg rounded-lg " style={{ background: 'white', padding: '0' }}>
            <div className="bg-white flex justify-center items-stretch w-[100%]">
                <div className="bg-white w-[50%]">
                    <div className="py-[8px]">
                        <p className="uppercase text-center font-[500]">Động cơ điện</p>
                    </div>
                    {cars.electric && cars.electric.length > 0
                        ? cars.electric.map((item) => {
                              return (
                                  <Menu.Item
                                      key="1"
                                      className="py-[20px]"
                                      style={{
                                          background: 'white',
                                          paddingLeft: '10px',
                                          paddingTop: '10px',
                                          paddingBottom: '10px',
                                          border: '1px solid #f4f4f4',
                                      }}
                                      onClick={() => handleNavigate(item?.link, item.id)}
                                  >
                                      {item.title}
                                  </Menu.Item>
                              );
                          })
                        : null}
                </div>
                <div className="bg-white w-[50%]">
                    <div className="py-[8px]">
                        <p className="uppercase text-center font-[500]">Động cơ xăng</p>
                    </div>
                    {cars.gasoline && cars.gasoline.length > 0
                        ? cars.gasoline.map((item) => {
                              return (
                                  <Menu.Item
                                      key="1"
                                      className="py-[20px]"
                                      style={{
                                          background: 'white',
                                          paddingLeft: '10px',
                                          paddingTop: '10px',
                                          paddingBottom: '10px',
                                          border: '1px solid #f4f4f4',
                                      }}
                                      onClick={() => handleNavigate(item?.link, item.id)}
                                  >
                                      {item.title}
                                  </Menu.Item>
                              );
                          })
                        : null}
                </div>
            </div>
        </Menu>
    );
};
