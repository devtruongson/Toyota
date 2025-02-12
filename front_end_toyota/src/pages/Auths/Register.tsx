import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Form, Input } from 'antd';
import { HttpStatusCode } from 'axios';
import React, { useEffect } from 'react';
import Swal from 'sweetalert2';
import { v4 as uuidv4 } from 'uuid';
import { registerService } from '../../services/registerService';
import { IRegister } from '../../utils/interface';

const RegisterPage: React.FC = () => {
    const onFinish = async (values: IRegister) => {
        try {
            values.code = uuidv4();
            const data = await registerService(values);
            if (data.code === HttpStatusCode.Ok) {
                Swal.fire({
                    text: 'Đăng ký thành công vui lòng đăng nhập tài khoản!',
                    icon: 'success',
                    allowOutsideClick: false,
                    showConfirmButton: true,
                }).then(() => {
                    window.location.href = '/login';
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
                text: 'Đăng ký thất bại!',
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
            <div className="w-full max-w-lg p-8 space-y-8 bg-white rounded-lg shadow-lg">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Đăng Ký</h2>
                    <p className="mt-2 text-center text-sm text-gray-600">Hãy đăng ký để tiếp tục</p>
                </div>
                <Form
                    name="login"
                    className="mt-8"
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    layout="vertical"
                >
                    <div className="flex items-center gap-2">
                        <Form.Item
                            name="first_name"
                            label="First Name"
                            rules={[{ required: true, message: 'Vui lòng nhập trường này!' }]}
                        >
                            <Input
                                size="large"
                                prefix={<UserOutlined className="text-gray-500" />}
                                placeholder="Firstname ..."
                            />
                        </Form.Item>
                        <Form.Item
                            name="last_name"
                            label="Last Name"
                            rules={[{ required: true, message: 'Vui lòng nhập trường này!' }]}
                        >
                            <Input
                                size="large"
                                prefix={<UserOutlined className="text-gray-500" />}
                                placeholder="Lastname ..."
                            />
                        </Form.Item>
                    </div>
                    <Form.Item
                        name="phone_number"
                        label="Số điện thoại"
                        rules={[{ required: true, message: 'Vui lòng nhập trường này!' }]}
                    >
                        <Input
                            size="large"
                            prefix={<UserOutlined className="text-gray-500" />}
                            placeholder="Phone number ..."
                        />
                    </Form.Item>
                    <div className="flex items-center gap-2">
                        <Form.Item
                            name="email"
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
                    </div>
                    <Form.Item
                        name="address_detail"
                        label="Địa chỉ"
                        rules={[{ required: true, message: 'Vui lòng nhập mật khẩu!' }]}
                    >
                        <Input.TextArea size="large" placeholder="Nhập địa chỉ..." />
                    </Form.Item>
                    <Form.Item>
                        <Button
                            type="primary"
                            htmlType="submit"
                            size="large"
                            className="w-full bg-blue-600 hover:bg-blue-700 border-none"
                        >
                            Đăng ký
                        </Button>
                    </Form.Item>
                </Form>
                <div className="text-center">
                    <span className="text-sm text-gray-600">Chưa có tài khoản? </span>
                    <a href="/login" className="text-blue-600 hover:underline text-sm">
                        Đăng nhập ngay
                    </a>
                </div>
            </div>
        </div>
    );
};

export default RegisterPage;
