import { useEffect, useState } from 'react';
import { ICar } from '../../../../../utils/interface';
import { createFeature, deleteFeature, getDetailCarService, updateCar } from '../../../../../services/carService';
import { HttpStatusCode } from 'axios';
import Swal from 'sweetalert2';
import { Button, Card, Checkbox, Form, Input, InputNumber, Modal, Select } from 'antd';
import { getLinkImage } from '../../../../../helpers/getLinkImage';
import ButtonClose from '../../../../product/component/common/ButtonClose/ButtonClose';
import { PlusCircleOutlined } from '@ant-design/icons';
import { uploadFileService } from '../../../../../services/uploadService';

const ModalUpdateCar = ({
    handleCancel,
    isModalOpen,
    car_id,
    onReload,
}: {
    car_id: number;
    isModalOpen: boolean;
    handleCancel: () => void;
    onReload: () => void;
}) => {
    const [carData, setCarData] = useState<ICar | null>(null);
    const [isReload, setIsReload] = useState(false);

    const [form] = Form.useForm();

    const onFinish = async (values: ICar) => {
        try {
            if (!values.id) return;
            const res = await updateCar(values);
            if (res.code === HttpStatusCode.Ok) {
                Swal.fire({
                    icon: 'success',
                    title: 'Bạn đã cập nhật thông tin xe thành công',
                });
                handleCancel();
                onReload();
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleDelteFuature = async (id: number) => {
        if (!id) return;

        try {
            const res = await deleteFeature(id);
            if (res.code === HttpStatusCode.Ok) {
                const newData = {
                    ...carData,
                    car_features: carData?.car_features.filter((item) => item.id !== id),
                } as ICar;
                setCarData(newData);
            }
        } catch (error) {
            console.log(error);
            Swal.fire({
                icon: 'error',
                title: 'Error',
            });
        }
    };

    useEffect(() => {
        const _fetch = async () => {
            try {
                const res = await getDetailCarService(car_id);
                if (res.code === HttpStatusCode.Ok) {
                    setCarData(res.data);
                }
            } catch (error) {
                console.log(error);
            }
        };
        _fetch();
    }, [car_id, isReload]);
    return (
        <Modal
            className="w-[60vw]"
            title="Cập nhật thông tin xe"
            open={isModalOpen}
            footer={null}
            onCancel={handleCancel}
            width={'60vw'}
        >
            {carData && (
                <div className="p-4 h-[70vh] overflow-auto">
                    <Card title={carData.title} className="mb-[20px]">
                        <Form form={form} layout="vertical" onFinish={onFinish} initialValues={carData}>
                            <Form.Item label="id" name="id" hidden>
                                <Input />
                            </Form.Item>
                            <Form.Item
                                label="Title"
                                name="title"
                                rules={[{ required: true, message: 'Vui lòng nhập title' }]}
                            >
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
                            <Form.Item
                                label="Weight"
                                name="weight"
                                rules={[{ required: true, message: 'Vui lòng nhập weight' }]}
                            >
                                <InputNumber
                                    style={{
                                        width: 400,
                                    }}
                                    placeholder="Nhập weight"
                                />
                            </Form.Item>
                            <Form.Item
                                label="Model"
                                name="model"
                                rules={[{ required: true, message: 'Vui lòng nhập model' }]}
                            >
                                <Select placeholder="Chọn loại xe">
                                    <Select.Option value="electric">Xe điện</Select.Option>
                                    <Select.Option value="gasoline">Xe xăng</Select.Option>
                                </Select>
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
                            <Form.Item
                                label="Status"
                                name="status"
                                rules={[{ required: true, message: 'Vui lòng nhập status' }]}
                            >
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
                            <Form.Item
                                label="Sound"
                                name="sound"
                                rules={[{ required: true, message: 'Vui lòng nhập sound' }]}
                            >
                                <Input placeholder="Nhập sound" />
                            </Form.Item>
                            <Form.Item
                                label="USB"
                                name="usb"
                                rules={[{ required: true, message: 'Vui lòng nhập USB' }]}
                            >
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
                            <Form.Item
                                label="Lights"
                                name="lights"
                                rules={[{ required: true, message: 'Vui lòng nhập lights' }]}
                            >
                                <Input placeholder="Nhập lights" />
                            </Form.Item>
                            <Form.Item
                                label="Brake"
                                name="brake"
                                rules={[{ required: true, message: 'Vui lòng nhập brake' }]}
                            >
                                <Input placeholder="Nhập brake" />
                            </Form.Item>
                            <Form.Item
                                label="Brake ABS"
                                name="brake_abs"
                                rules={[{ required: true, message: 'Vui lòng nhập brake abs' }]}
                            >
                                <Input placeholder="Nhập brake abs" />
                            </Form.Item>
                            <Form.Item
                                label="EBD"
                                name="ebd"
                                rules={[{ required: true, message: 'Vui lòng nhập ebd' }]}
                            >
                                <Input placeholder="Nhập ebd" />
                            </Form.Item>
                            <Form.Item
                                label="ESC"
                                name="esc"
                                rules={[{ required: true, message: 'Vui lòng nhập esc' }]}
                            >
                                <Input placeholder="Nhập esc" />
                            </Form.Item>
                            <Form.Item
                                label="TCS"
                                name="tcs"
                                rules={[{ required: true, message: 'Vui lòng nhập tcs' }]}
                            >
                                <Input placeholder="Nhập tcs" />
                            </Form.Item>
                            <Form.Item
                                label="HSA"
                                name="hsa"
                                rules={[{ required: true, message: 'Vui lòng nhập hsa' }]}
                            >
                                <Input placeholder="Nhập hsa" />
                            </Form.Item>
                            <Form.Item
                                label="ROM"
                                name="rom"
                                rules={[{ required: true, message: 'Vui lòng nhập rom' }]}
                            >
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
                            <Form.Item>
                                <Button type="primary" htmlType="submit" className="w-full">
                                    Cập nhật
                                </Button>
                            </Form.Item>
                        </Form>
                    </Card>

                    <Card title="Các Phiên bản màu của xe" className="shadow-lg">
                        <div className="flex flex-wrap gap-4">
                            {carData.car_features.map((feature) => (
                                <div key={feature.id} className="flex flex-col items-center relative">
                                    <div className="absolute top-[-10px] right-0">
                                        <ModalConfirmDelete onDelete={() => handleDelteFuature(feature.id)} />
                                    </div>

                                    <img
                                        src={getLinkImage(feature.image_url)}
                                        alt={feature.color}
                                        className="w-32 h-20 object-cover rounded"
                                    />
                                    <span className="mt-2 text-sm">{feature.color}</span>
                                </div>
                            ))}
                            {carData.car_features.length < 8 ? (
                                <ModalAddImage id={carData.id} onReload={() => setIsReload(!isReload)} />
                            ) : null}
                        </div>
                    </Card>
                </div>
            )}
        </Modal>
    );
};

export default ModalUpdateCar;

type ModalProps = {
    onDelete: () => void;
};
const ModalConfirmDelete = ({ onDelete }: ModalProps) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
        onDelete();
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    return (
        <>
            <ButtonClose onClick={showModal} color="red" />
            <Modal title="Basic Modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                <p>Bạn có cahwcs muốn xóa ảnh xe đã chon chứ ?</p>
            </Modal>
        </>
    );
};

const ModalAddImage = ({ id, onReload }: { id: number; onReload: () => void }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [image, setImage] = useState('');
    const [color, setColor] = useState('');

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
        handlCreate();
    };

    const handleCancel = () => {
        setIsModalOpen(false);
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
                setImage(res.data.url_public);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handlCreate = async () => {
        if (!id) return;
        if (!image || !color) {
            Swal.fire({
                icon: 'warning',
                title: 'Bạn vui lòng điền đầy đủ thông tin',
            });
        }
        try {
            const res = await createFeature({ car_id: id, image_url: image, color: color });
            if (res.code === HttpStatusCode.Ok) {
                Swal.fire({
                    icon: 'success',
                    title: 'Thêm thành công',
                });
                onReload();
            }
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <>
            <div
                className="border-[1px] border-[#ccc] border-solid rounded-[10px] w-[120px] flex justify-center items-center"
                onClick={showModal}
            >
                <PlusCircleOutlined />
            </div>
            <Modal open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                <div className="py-[28px] flex flex-col items-center gap-[10px]">
                    <Input
                        type="file"
                        onChange={(e) => handleUploadFile(e)}
                        disabled={Boolean(image)}
                        className="w-[80%]"
                    />
                    {image ? (
                        <div className="flex justify-between items-center w-full">
                            <div className="w-[95%]">
                                <ul>
                                    <li className="flex items-center gap-3 border-amber-200 border rounded-md my-1">
                                        <img
                                            src={getLinkImage(image)}
                                            className="w-[50px] object-cover h-[50px]"
                                            alt=""
                                        />
                                        <span>{image}</span>
                                    </li>
                                </ul>
                            </div>
                            <ButtonClose onClick={() => setImage('')} color="orange" />
                        </div>
                    ) : null}
                    <Input
                        type="text"
                        placeholder="Nhập màu"
                        onChange={(e) => setColor(e.target.value)}
                        className="w-[80%]"
                    />
                    <button onClick={() => handlCreate()}></button>
                </div>
            </Modal>
        </>
    );
};
