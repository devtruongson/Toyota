import { Button, Checkbox, Form, Input, InputNumber, Space } from 'antd';
import { HttpStatusCode } from 'axios';
import React, { useState } from 'react';
import processENV from '../../../../../configs/process';
import { uploadFileService } from '../../../../../services/uploadService';
import { ICar } from '../../../../../utils/interface';

const AddCarPage: React.FC = () => {
    const [form] = Form.useForm();
    const [listImage, setListImage] = useState<string[]>([]);

    const onFinish = async (values: ICar) => {
        console.log('Dữ liệu form:', values);
        if (!listImage.length) {
            return;
        }
        try {
            // const data  = values.car_features =
        } catch (error) {
            console.log(error);
        }
        // Ở đây bạn có thể tích hợp gọi API thêm xe, ví dụ:
        // addCarService(values).then(...).catch(...);
    };
    const handleUploadFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
        try {
            const files = e.target?.files;
            if (!files) return;
            const file = files[0];
            const res = await uploadFileService({
                file: file,
            });
            if (res.code === HttpStatusCode.Ok) {
                setListImage((prev) => [...prev, res.data.url_public]);
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="mx-auto p-8 bg-white shadow rounded">
            <h2 className="text-3xl font-bold mb-6 text-center">Thêm xe mới</h2>
            <Form form={form} layout="vertical" onFinish={onFinish}>
                <h3 className="text-2xl font-semibold mb-4">Thông tin xe</h3>
                <Form.Item label="Title" name="title" rules={[{ required: true, message: 'Vui lòng nhập title' }]}>
                    <Input placeholder="Nhập title" />
                </Form.Item>
                <Form.Item
                    label="Meta Sub Title"
                    name="meta_sub_title"
                    rules={[{ required: true, message: 'Vui lòng nhập meta sub title' }]}
                >
                    <Input.TextArea className="min-h-[200px]" placeholder="Nhập meta sub title" />
                </Form.Item>

                <Form.Item
                    label="Description"
                    name="description"
                    rules={[{ required: true, message: 'Vui lòng nhập description' }]}
                >
                    <Input.TextArea placeholder="Nhập description" rows={4} />
                </Form.Item>
                <Form.Item label="Weight" name="weight" rules={[{ required: true, message: 'Vui lòng nhập weight' }]}>
                    <InputNumber
                        style={{
                            width: 400,
                        }}
                        placeholder="Nhập weight"
                    />
                </Form.Item>
                <Form.Item label="Model" name="model" rules={[{ required: true, message: 'Vui lòng nhập model' }]}>
                    <Input placeholder="Nhập model" />
                </Form.Item>
                <Form.Item
                    label="Battery Capacity"
                    name="battery_capacity"
                    rules={[{ required: true, message: 'Vui lòng nhập battery capacity' }]}
                >
                    <Input placeholder="Nhập battery capacity" />
                </Form.Item>
                <Form.Item
                    label="Range (km)"
                    name="range_km"
                    rules={[{ required: true, message: 'Vui lòng nhập range (km)' }]}
                >
                    <Input placeholder="Nhập range (km)" />
                </Form.Item>
                <Form.Item
                    label="Price (No Battery)"
                    name="price_no_battery"
                    rules={[{ required: true, message: 'Vui lòng nhập price no battery' }]}
                >
                    <Input placeholder="Nhập price no battery" />
                </Form.Item>
                <Form.Item
                    label="Price (Has Battery)"
                    name="price_has_battery"
                    rules={[{ required: true, message: 'Vui lòng nhập price has battery' }]}
                >
                    <Input placeholder="Nhập price has battery" />
                </Form.Item>
                <Form.Item label="Status" name="status" rules={[{ required: true, message: 'Vui lòng nhập status' }]}>
                    <Input placeholder="Nhập status" />
                </Form.Item>
                <Form.Item
                    label="Display"
                    name="display"
                    rules={[{ required: true, message: 'Vui lòng nhập display' }]}
                >
                    <Input placeholder="Nhập display" />
                </Form.Item>
                <Form.Item
                    label="Conditioning"
                    name="conditioning"
                    rules={[{ required: true, message: 'Vui lòng nhập conditioning' }]}
                >
                    <Input placeholder="Nhập conditioning" />
                </Form.Item>
                <Form.Item label="Sound" name="sound" rules={[{ required: true, message: 'Vui lòng nhập sound' }]}>
                    <Input placeholder="Nhập sound" />
                </Form.Item>
                <Form.Item label="USB" name="usb" rules={[{ required: true, message: 'Vui lòng nhập USB' }]}>
                    <Input placeholder="Nhập USB" />
                </Form.Item>
                <Form.Item
                    label="Bluetooth"
                    name="bluetooth"
                    rules={[{ required: true, message: 'Vui lòng nhập bluetooth' }]}
                >
                    <Input placeholder="Nhập bluetooth" />
                </Form.Item>
                <Form.Item
                    label="Sun Visor"
                    name="sun_visor"
                    rules={[{ required: true, message: 'Vui lòng nhập sun visor' }]}
                >
                    <Input placeholder="Nhập sun visor" />
                </Form.Item>
                <Form.Item label="Lights" name="lights" rules={[{ required: true, message: 'Vui lòng nhập lights' }]}>
                    <Input placeholder="Nhập lights" />
                </Form.Item>
                <Form.Item label="Brake" name="brake" rules={[{ required: true, message: 'Vui lòng nhập brake' }]}>
                    <Input placeholder="Nhập brake" />
                </Form.Item>
                <Form.Item
                    label="Brake ABS"
                    name="brake_abs"
                    rules={[{ required: true, message: 'Vui lòng nhập brake abs' }]}
                >
                    <Input placeholder="Nhập brake abs" />
                </Form.Item>
                <Form.Item label="EBD" name="ebd" rules={[{ required: true, message: 'Vui lòng nhập ebd' }]}>
                    <Input placeholder="Nhập ebd" />
                </Form.Item>
                <Form.Item label="ESC" name="esc" rules={[{ required: true, message: 'Vui lòng nhập esc' }]}>
                    <Input placeholder="Nhập esc" />
                </Form.Item>
                <Form.Item label="TCS" name="tcs" rules={[{ required: true, message: 'Vui lòng nhập tcs' }]}>
                    <Input placeholder="Nhập tcs" />
                </Form.Item>
                <Form.Item label="HSA" name="hsa" rules={[{ required: true, message: 'Vui lòng nhập hsa' }]}>
                    <Input placeholder="Nhập hsa" />
                </Form.Item>
                <Form.Item label="ROM" name="rom" rules={[{ required: true, message: 'Vui lòng nhập rom' }]}>
                    <Input placeholder="Nhập rom" />
                </Form.Item>
                <Form.Item
                    label="Air Bag"
                    name="air_bag"
                    rules={[{ required: true, message: 'Vui lòng nhập air bag' }]}
                >
                    <Input placeholder="Nhập air bag" />
                </Form.Item>
                <Form.Item
                    label="Key Code"
                    name="key_code"
                    rules={[{ required: true, message: 'Vui lòng nhập key code' }]}
                >
                    <Input placeholder="Nhập key code" />
                </Form.Item>
                <div className="flex gap-2">
                    <Form.Item label="Active" name="is_active" valuePropName="checked">
                        <Checkbox />
                    </Form.Item>
                    <Form.Item label="Hiển thị Form" name="is_show_form" valuePropName="checked">
                        <Checkbox />
                    </Form.Item>
                </div>
                <h3 className="text-2xl font-semibold mt-8 mb-4">Tính năng của xe</h3>
                <Form.Item name="car_features">
                    <Space direction="vertical" className="w-full">
                        <div>
                            <Input type="file" onChange={handleUploadFile} />
                            <div>
                                <ul>
                                    {listImage.map((url, index) => (
                                        <li
                                            key={index}
                                            className="flex items-center gap-3 border-amber-200 border rounded-md my-1"
                                        >
                                            <img
                                                src={`${processENV.VITE_URL_BACKEND}${url}`}
                                                className="w-[50px] object-cover h-[50px]"
                                                alt=""
                                            />
                                            <span>{url}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                        <Form.Item
                            label="Color"
                            name="color"
                            rules={[{ required: true, message: 'Vui lòng nhập color' }]}
                        >
                            <Input placeholder="Nhập color" />
                        </Form.Item>
                        <Form.Item label="Active" name="is_active" valuePropName="checked">
                            <Checkbox />
                        </Form.Item>
                    </Space>
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit" className="w-full">
                        Thêm xe
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default AddCarPage;
