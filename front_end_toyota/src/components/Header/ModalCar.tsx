import { Button, DatePicker, Form, Input, Modal, Radio } from 'antd';
import { HttpStatusCode } from 'axios';
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { useAppSelector } from '../../app/hooks';
import { getAllCar } from '../../services/carService';
import { registerFormService } from '../../services/registerFormService';
import { ICar, IRegisterForm } from '../../utils/interface';

const BookCarModal = ({ visible, handleClose }: { handleClose: () => void; visible: boolean }) => {
    const [form] = Form.useForm();
    const [car, setCar] = useState<ICar[]>([]);
    const user = useAppSelector((state) => state.auth.user);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const onFinish = async (values: { car: number; note: string; time: any }) => {
        if (!user) return;

        const data: IRegisterForm = {
            car_id: values.car,
            note: values.note,
            time: new Date(values.time['$d']).getTime(),
            user_id: user?.id,
            type: 'BOOK_DEMO',
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
        handleClose();
    };

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
        <>
            <Modal
                title="ĐẶT XE NGAY HÔM NAY ĐỂ NHẬN ĐƯỢC ƯU ĐÃI TỐT NHẤT"
                open={visible}
                onCancel={handleClose}
                footer={null}
                width={'60vw'}
            >
                <Form form={form} layout="vertical" onFinish={onFinish} className="space-y-4">
                    <Form.Item
                        label="Chọn xe"
                        name="car"
                        rules={[
                            {
                                required: true,
                                message: 'Vui lòng chọn 1 xe',
                            },
                        ]}
                    >
                        <Radio.Group>
                            <div className="grid grid-cols-4 gap-2">
                                {car.map((item) => (
                                    <Radio value={item.id} key={item.id}>
                                        {item.title}
                                    </Radio>
                                ))}
                            </div>
                        </Radio.Group>
                    </Form.Item>

                    <Form.Item
                        name="time"
                        label="Thời gian lái thử"
                        rules={[{ required: true, message: 'Vui lòng chọn thời gian' }]}
                    >
                        <DatePicker showTime format="YYYY-MM-DD HH:mm" className="w-full" />
                    </Form.Item>

                    <Form.Item name="note" rules={[{ required: true, message: 'Vui lòng nhập ghi chú' }]}>
                        <Input.TextArea className="min-h-[200px]" placeholder="Nhập ghi chú" />
                    </Form.Item>

                    <Form.Item>
                        {isLoading ? (
                            <Button type="primary" htmlType="button" className="w-full">
                                Đang gửi thông tin....
                            </Button>
                        ) : (
                            <Button type="primary" htmlType="submit" className="w-full">
                                GỬI
                            </Button>
                        )}
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
};

export default BookCarModal;
