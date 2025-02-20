import { Button, Form, Input } from 'antd';
import { HttpStatusCode } from 'axios';
import Swal from 'sweetalert2';
import { createChargingService } from '../../../../../services/chargingService';

interface ChargingFormValues {
    name: string;
    location: string;
    power_kw: string;
}

export default function AddCharging() {
    const [form] = Form.useForm<ChargingFormValues>();

    const onFinish = async (values: ChargingFormValues) => {
        try {
            const res = await createChargingService(values);
            if (res.code === HttpStatusCode.Ok) {
                Swal.fire({
                    text: 'Thêm trạm sạc thành công!',
                });
            }
        } catch (error) {
            console.log(error);
        }
        form.resetFields();
    };

    return (
        <div className="mx-auto p-4">
            <Form form={form} layout="vertical" onFinish={onFinish} className="space-y-4">
                <Form.Item label="Tên" name="name" rules={[{ required: true, message: 'Vui lòng nhập tên' }]}>
                    <Input placeholder="Nhập tên" />
                </Form.Item>

                <Form.Item
                    label="Địa điểm"
                    name="location"
                    rules={[{ required: true, message: 'Vui lòng nhập địa điểm' }]}
                >
                    <Input.TextArea rows={3} placeholder="Nhập địa điểm" />
                </Form.Item>

                <Form.Item
                    label="Công suất (KW)"
                    name="power_kw"
                    rules={[{ required: true, message: 'Vui lòng nhập công suất' }]}
                >
                    <Input placeholder="Nhập công suất" />
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit" className="w-full">
                        Thêm Charging
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
}
