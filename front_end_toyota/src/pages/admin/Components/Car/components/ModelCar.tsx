import { Card, Descriptions, Modal } from 'antd';
import { HttpStatusCode } from 'axios';
import { useEffect, useState } from 'react';
import { getDetailCarService } from '../../../../../services/carService';
import { ICar } from '../../../../../utils/interface';

export default function ModalCar({
    handleCancel,
    isModalOpen,
    car_id,
}: {
    car_id: number;
    isModalOpen: boolean;
    handleCancel: () => void;
}) {
    const [carData, setCarData] = useState<ICar | null>(null);

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
    }, [car_id]);

    return (
        <Modal
            className="w-[60vw]"
            title="Thông tin xe"
            open={isModalOpen}
            footer={null}
            onCancel={handleCancel}
            width={'60vw'}
        >
            {carData && (
                <div className="p-4 h-[70vh] overflow-auto">
                    {/* Card hiển thị thông tin xe */}
                    <Card title={carData.title} className="mb-6 shadow-lg">
                        <Descriptions
                            title="Thông tin chi tiết"
                            bordered
                            layout="vertical"
                            column={1}
                            className="bg-white"
                        >
                            <Descriptions.Item label="ID">{carData.id}</Descriptions.Item>
                            <Descriptions.Item label="Meta Sub Title">{carData.meta_sub_title}</Descriptions.Item>
                            <Descriptions.Item label="Hiển thị Form">
                                {carData.is_show_form ? 'Có' : 'Không'}
                            </Descriptions.Item>
                            <Descriptions.Item
                                label="Mô tả"
                                style={{
                                    whiteSpace: 'pre-wrap',
                                }}
                            >
                                {carData.description}
                            </Descriptions.Item>
                            <Descriptions.Item label="Trọng lượng">{carData.weight}</Descriptions.Item>
                            <Descriptions.Item label="Model">{carData.model}</Descriptions.Item>
                            <Descriptions.Item label="Dung lượng pin">{carData.battery_capacity}</Descriptions.Item>
                            <Descriptions.Item label="Phạm vi (km)">{carData.range_km}</Descriptions.Item>
                            <Descriptions.Item label="Giá (không có pin)">{carData.price_no_battery}</Descriptions.Item>
                            <Descriptions.Item label="Giá (có pin)">{carData.price_has_battery}</Descriptions.Item>
                            <Descriptions.Item label="Trạng thái">{carData.status}</Descriptions.Item>
                            <Descriptions.Item label="Hiển thị">{carData.display}</Descriptions.Item>
                            <Descriptions.Item label="Điều hòa">{carData.conditioning}</Descriptions.Item>
                            <Descriptions.Item label="Âm thanh">{carData.sound}</Descriptions.Item>
                            <Descriptions.Item label="USB">{carData.usb}</Descriptions.Item>
                            <Descriptions.Item label="Bluetooth">{carData.bluetooth}</Descriptions.Item>
                            <Descriptions.Item label="Gương chắn nắng">{carData.sun_visor}</Descriptions.Item>
                            <Descriptions.Item label="Đèn">{carData.lights}</Descriptions.Item>
                            <Descriptions.Item label="Phanh">{carData.brake}</Descriptions.Item>
                            <Descriptions.Item label="Phanh ABS">{carData.brake_abs}</Descriptions.Item>
                            <Descriptions.Item label="EBD">{carData.ebd}</Descriptions.Item>
                            <Descriptions.Item label="ESC">{carData.esc}</Descriptions.Item>
                            <Descriptions.Item label="TCS">{carData.tcs}</Descriptions.Item>
                            <Descriptions.Item label="HSA">{carData.hsa}</Descriptions.Item>
                            <Descriptions.Item label="ROM">{carData.rom}</Descriptions.Item>
                            <Descriptions.Item label="Túi khí">{carData.air_bag}</Descriptions.Item>
                            <Descriptions.Item label="Key Code">{carData.key_code}</Descriptions.Item>
                            <Descriptions.Item label="Trạng thái hoạt động">
                                {carData.is_active ? 'Active' : 'Inactive'}
                            </Descriptions.Item>
                            <Descriptions.Item label="Ngày tạo">
                                {new Date(carData.createdAt).toLocaleString()}
                            </Descriptions.Item>
                            <Descriptions.Item label="Ngày cập nhật">
                                {new Date(carData.updatedAt).toLocaleString()}
                            </Descriptions.Item>
                        </Descriptions>
                    </Card>

                    {/* Card hiển thị các tính năng của xe */}
                    <Card title="Các tính năng của xe" className="shadow-lg">
                        <div className="flex flex-wrap gap-4">
                            {carData.car_features.map((feature) => (
                                <div key={feature.id} className="flex flex-col items-center">
                                    <img
                                        src={feature.image_url}
                                        alt={feature.color}
                                        className="w-32 h-20 object-cover rounded"
                                    />
                                    <span className="mt-2 text-sm">{feature.color}</span>
                                </div>
                            ))}
                        </div>
                    </Card>
                </div>
            )}
        </Modal>
    );
}
