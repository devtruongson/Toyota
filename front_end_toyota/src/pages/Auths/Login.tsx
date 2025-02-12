import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input } from 'antd';
import { HttpStatusCode } from 'axios';
import React, { useEffect } from 'react';
import Swal from 'sweetalert2';
import { useAppDispatch } from '../../app/hooks';
import { loginSucessAction } from '../../app/slices/appSlice';
import { loginService } from '../../services/loginService';
import { ILoginForm } from '../../utils/interface';

const LoginPage: React.FC = () => {
    const dispatch = useAppDispatch();

    const onFinish = async (values: ILoginForm) => {
        try {
            const data = await loginService(values);
            if (data.code === HttpStatusCode.Ok) {
                dispatch(loginSucessAction(data.data));
                Swal.fire({
                    text: 'Đăng nhập thành công!',
                    icon: 'success',
                    allowOutsideClick: false,
                    showConfirmButton: true,
                }).then(() => {
                    window.location.href = '/';
                });
            } else {
                Swal.fire({
                    text: data.msg,
                    icon: 'error',
                });
            }
        } catch (error: unknown) {
            console.log(error);
            Swal.fire({
                text: 'Đăng nhập thất bại!',
                icon: 'success',
            });
        }
    };

    useEffect(() => {
        window.scrollTo({
            top: document.documentElement.scrollHeight,
            behavior: 'smooth',
        });
    }, []);

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500">
            <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-lg">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Đăng Nhập</h2>
                    <p className="mt-2 text-center text-sm text-gray-600">Hãy đăng nhập để tiếp tục</p>
                </div>
                <Form
                    name="login"
                    className="mt-8"
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    layout="vertical"
                >
                    <Form.Item
                        name="username"
                        label="Tài khoản"
                        rules={[{ required: true, message: 'Vui lòng nhập tài khoản!' }]}
                    >
                        <Input
                            type="email"
                            size="large"
                            prefix={<UserOutlined className="text-gray-500" />}
                            placeholder="Nhập tài khoản của bạn"
                        />
                    </Form.Item>
                    <Form.Item
                        name="password"
                        label="Mật khẩu"
                        rules={[{ required: true, message: 'Vui lòng nhập mật khẩu!' }]}
                    >
                        <Input.Password
                            size="large"
                            prefix={<LockOutlined className="text-gray-500" />}
                            placeholder="Nhập mật khẩu của bạn"
                        />
                    </Form.Item>
                    <Form.Item className="flex justify-between items-center">
                        <Form.Item name="remember" valuePropName="checked" noStyle>
                            <Checkbox>Ghi nhớ đăng nhập</Checkbox>
                        </Form.Item>
                        <a href="#" className="text-sm text-blue-600 hover:underline">
                            Quên mật khẩu?
                        </a>
                    </Form.Item>
                    <Form.Item>
                        <Button
                            type="primary"
                            htmlType="submit"
                            size="large"
                            className="w-full bg-blue-600 hover:bg-blue-700 border-none"
                        >
                            Đăng nhập
                        </Button>
                    </Form.Item>
                </Form>
                <div className="text-center">
                    <span className="text-sm text-gray-600">Chưa có tài khoản? </span>
                    <a href="/register" className="text-blue-600 hover:underline text-sm">
                        Đăng ký ngay
                    </a>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
