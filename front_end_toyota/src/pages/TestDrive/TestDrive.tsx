import { Button, DatePicker, Form, Input, Radio } from 'antd';
import { HttpStatusCode } from 'axios';
import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { useAppSelector } from '../../app/hooks';
import { getAllCar } from '../../services/carService';
import { registerFormService } from '../../services/registerFormService';
import { ICar, IRegisterForm } from '../../utils/interface';

const RegisterTestDrivePage: React.FC = () => {
    const [form] = Form.useForm<{
        car_id: number;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        date: any;
        license: string;
        note: string;
    }>();
    const [car, setCar] = useState<ICar[]>([]);
    const user = useAppSelector((state) => state.auth.user);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const onFinish = async (values: { car_id: number; date: any; license: string; note: string }) => {
        if (!user) return;

        const data: IRegisterForm = {
            car_id: values.car_id,
            time: new Date(values.date['$d']).getTime(),
            user_id: user?.id,
            type: 'TEST_DRIVE',
            note: `Khách hàng đã có bằng: ${values.license}. Ghi chú của khách: ${values.note}`,
        };

        try {
            setIsLoading(true);
            const res = await registerFormService(data);
            if (res.code === HttpStatusCode.Ok) {
                Swal.fire({
                    text: 'Bạn đã đặt xe online thành công!',
                });
            }
            setIsLoading(false);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        window.scrollTo({
            top: document.documentElement.scrollHeight,
            behavior: 'smooth',
        });
    }, []);

    useEffect(() => {
        const _fetch = async () => {
            try {
                const res = await getAllCar(1, 100, true);
                if (res.code === HttpStatusCode.Ok) {
                    setCar(res.data.items);
                }
            } catch (error) {
                console.log(error);
            }
        };

        _fetch();
    }, []);

    return (
        <div className="relative w-full h-screen bg-gray-100">
            <div
                className="absolute top-0 left-0 w-full h-full bg-cover bg-center"
                style={{
                    backgroundImage:
                        'url("https://vinfastnewway.com.vn/wp-content/uploads/2019/08/test-drive-fix.jpg")',
                    filter: 'blur(2px)',
                }}
            />
            <div className="absolute top-0 left-0 w-full h-full" />
            <div className="relative z-10 flex items-center justify-center h-full">
                <div className="bg-white rounded shadow-lg p-8 w-full max-w-4xl">
                    <h1 className="text-2xl font-bold text-center mb-6">ĐĂNG KÝ LÁI THỬ XE VINFAST</h1>

                    <Form form={form} layout="vertical" onFinish={onFinish} className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <Form.Item
                                label="Ghi chú"
                                name="note"
                                rules={[{ required: true, message: 'Vui lòng nhập ghi chú' }]}
                            >
                                <Input placeholder="Nhận xe buổi sáng..." />
                            </Form.Item>
                            <Form.Item
                                label="Lịch hẹn"
                                name="date"
                                rules={[{ required: true, message: 'Vui lòng chọn ngày' }]}
                            >
                                <DatePicker
                                    placeholder="Chọn ngày"
                                    className="w-full"
                                    format="DD/MM/YYYY"
                                    disabledDate={(current) => current && current < dayjs().startOf('day')}
                                />
                            </Form.Item>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <Form.Item
                                label="Bằng lái bạn có?"
                                name="license"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Vui lòng chọn loại bằng lái',
                                    },
                                ]}
                            >
                                <Radio.Group>
                                    <div className="flex flex-col space-y-2">
                                        <Radio value="B1">B1</Radio>
                                        <Radio value="B2">B2</Radio>
                                        <Radio value="B3">B3</Radio>
                                    </div>
                                </Radio.Group>
                            </Form.Item>

                            <Form.Item
                                label="Xe nào muốn lái thử?"
                                name="car_id"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Vui lòng chọn 1 dòng xe',
                                    },
                                ]}
                            >
                                <Radio.Group>
                                    <div className="flex flex-col space-y-2">
                                        {car &&
                                            car.map((car) => (
                                                <Radio key={car.id} value={car.id}>
                                                    {car.title}
                                                </Radio>
                                            ))}
                                    </div>
                                </Radio.Group>
                            </Form.Item>
                        </div>
                        <div className="text-center mt-6">
                            {isLoading ? (
                                <Button type="primary" htmlType="button" className="w-full">
                                    Đang gửi thông tin....
                                </Button>
                            ) : (
                                <Button type="primary" htmlType="submit" size="large">
                                    GỬI ĐĂNG KÝ
                                </Button>
                            )}
                        </div>
                    </Form>
                </div>
            </div>
        </div>
    );
};

export default RegisterTestDrivePage;
