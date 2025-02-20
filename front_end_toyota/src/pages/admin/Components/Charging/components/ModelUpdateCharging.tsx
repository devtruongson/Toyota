import { Button, Form, Input, Modal } from 'antd';
import React, { useState } from 'react';

interface FormValues {
    name: string;
    location: string;
    power_kw: string;
}

interface EditModalProps {
    visible: boolean;
    onCancel: () => void;
    onSave: (values: FormValues) => void;
    initialValues: FormValues;
}

const EditModal: React.FC<EditModalProps> = ({ visible, onCancel, onSave, initialValues }) => {
    const [form] = Form.useForm<FormValues>();

    const handleOk = async () => {
        try {
            const values = await form.validateFields();
            onSave(values);
            form.resetFields();
        } catch (errorInfo) {
            console.log('Validate Failed:', errorInfo);
        }
    };

    const [location, setLocation] = useState<string>(initialValues.location);

    return (
        <Modal
            open={visible}
            width={'70vw'}
            title="Chỉnh sửa dữ liệu"
            onCancel={onCancel}
            footer={[
                <Button key="cancel" onClick={onCancel}>
                    Hủy
                </Button>,
                <Button key="save" type="primary" onClick={handleOk}>
                    Lưu
                </Button>,
            ]}
        >
            <Form
                form={form}
                initialValues={initialValues}
                layout="vertical"
                className="space-y-4" // Sử dụng Tailwind để tạo khoảng cách giữa các trường
            >
                <Form.Item name="name" label="Tên" rules={[{ required: true, message: 'Vui lòng nhập tên' }]}>
                    <Input placeholder="Nhập tên" />
                </Form.Item>

                <Form.Item
                    name="location"
                    label="Địa điểm"
                    rules={[{ required: true, message: 'Vui lòng nhập địa điểm' }]}
                >
                    <Input.TextArea
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        rows={4}
                        placeholder="Nhập địa điểm"
                    />
                </Form.Item>

                <Form.Item
                    name="power_kw"
                    label="Công suất (KW)"
                    rules={[{ required: true, message: 'Vui lòng nhập công suất' }]}
                >
                    <Input placeholder="Nhập công suất" />
                </Form.Item>
            </Form>
            <iframe
                title="Charging Station Location"
                className="w-[100%] h-[300px] rounded-2xl overflow-hidden"
                src={location}
                height="450"
                loading="lazy"
            ></iframe>
        </Modal>
    );
};

export default EditModal;
