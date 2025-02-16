import { useEffect, useRef, useState } from 'react';
import { useAppSelector } from '../../../../app/hooks';
import { ICar } from '../../../../utils/interface';
import { getDetailCarService } from '../../../../services/carService';
import { HttpStatusCode } from 'axios';
import { Col, Row } from 'antd';
import { imageShowroom } from '../../../../constants';
import { colors } from '../../../../constants/colors';
import { formatVND } from '../../../../helpers/formatVND';
import Installment from '../common/Installment/Installment';
import LabelCustom from '../common/LabelCustom/LabelCustom';
import TableParameter from '../common/TableParameter/TableParameter';
import TableIntorior from '../common/TableIntorior/TableIntorior';

const CarDetail = () => {
    const carId = useAppSelector((state) => state.currentCar);
    const [car, setCar] = useState<ICar | null>(null);

    const headerHeightRef = useRef(0);

    useEffect(() => {
        const headerElement = document.querySelector('.header-main') as HTMLElement | null;

        if (headerElement) {
            headerHeightRef.current = headerElement.offsetHeight;
        }
    }, []);

    useEffect(() => {
        const fetch = async () => {
            const res = await getDetailCarService(carId as number);
            if (res.code === HttpStatusCode.Ok) {
                setCar(res.data);
            }
        };

        if (carId) {
            fetch();
        }
    }, [carId]);

    return (
        <div
            className="fixed top-0 right-0 left-0 bottom-0  bg-cover bg-center overflow-y-auto z-[10] pt-[100px]"
            style={{ backgroundImage: `url(${imageShowroom})`, paddingTop: headerHeightRef.current }}
        >
            {car ? (
                <div className={` absolute z-[100]`}>
                    <div className="w-full bg-white flex justify-center shadow pt-[8px] pb-[20px]">
                        <div className="w-[60%] ">
                            <Row>
                                <Col span={16}>img</Col>
                                <Col span={8}>
                                    <div className="p-[8px] mb-[20px]">
                                        <p className="text-[24px] font-[500] mb-[8px]">{car.title}</p>
                                        <p className="text-[16px] font-[500] italic mb-[16px]">{car.meta_sub_title}</p>
                                        <p className="text-[16px]">{car.description}</p>
                                    </div>

                                    <div className="w-full bg-blue-600 rounded-[8px] py-[8px] cursor-pointer hover:opacity-[0.7]">
                                        <p className="text-center text-white">Hotline: 0966 35 7777</p>
                                    </div>
                                </Col>
                            </Row>
                        </div>
                    </div>

                    <div className="w-full flex justify-center py-[20px]" style={{ background: colors.bg }}>
                        <Row className="w-[60%] " gutter={28} align="stretch">
                            <Col span={12} className="">
                                <div className=" h-full bg-white py-[8px] px-[12px] rounded-[4px] shadow">
                                    <p className="text-[20px] uppercase mb-[20px]">Giá xe {car.title}</p>

                                    <p className="mb-[20px]">
                                        Giá xe {car.title} Plus cập nhập mới nhất, áp dụng tháng
                                        {new Date(car.updatedAt).getMonth()}/{new Date(car.updatedAt).getFullYear()}:
                                    </p>

                                    <p className="mb-[10px]">
                                        Giá bán {car.title} không bao gồm pin (Khách hàng thuê pin):
                                    </p>
                                    <p className="mb-[20px]  font-[600]">
                                        • Giá niêm yết: {formatVND(car.price_no_battery)}
                                    </p>

                                    <p className="mb-[10px]">Giá bán {car.title} bao gồm pin (khách hàng mua pin):</p>
                                    <p className="mb-[10px] font-[600]">
                                        • Giá niêm yết: {formatVND(car.price_has_battery)}
                                    </p>

                                    <p>(Giá bán trên đã bao gồm VAT)</p>
                                </div>
                            </Col>
                            <Col span={12} className="">
                                <div className="bg-white py-[8px] px-[12px] h-full rounded-[4px] shadow">
                                    <p className="text-[20px] uppercase mb-[20px]">Giá thuê pin {car.title}</p>
                                    <p className="mb-[10px]">
                                        Giá thuê pin {car.title} là số tiền hàng tháng khách hàng phải trả cho VinFast
                                        khi mua xe theo hình thức thuê pin.
                                    </p>
                                    <p className="mb-[10px]">
                                        Giá thuê pin này phụ thuộc vào chính sách bán hàng ở tùng thời điểm. Hiện tại,
                                        giá thuê pin {car.title} phụ thuộc vào quãng đường di chuyển theo tháng của
                                        khách hàng.
                                    </p>
                                    <ul className="mb-[10px]">
                                        <li>{`• Số Km/ tháng <=1.500Km: phí thuê pin là: 2.300.000 VNĐ.`}</li>
                                        <li>{`• Số Km/ tháng >1.500Km và <3.000Km: phí thuê pin là: 3.500.000 VNĐ.`}</li>
                                        <li>{`• Số Km/ tháng >3.500Km: phí thuê pin là: 5.800.000 VNĐ.`}</li>
                                    </ul>
                                    <p className="text-center italic">(Đã bao gồm VAT)</p>
                                </div>
                            </Col>
                        </Row>
                    </div>

                    <div className="w-full flex justify-center py-[20px]">
                        <div className="bg-black/30 px-[40px] pt-[16px] pb-[16px] rounded-lg w-[60%]">
                            <h2 className="text-white font-bold text-lg text-center mb-[20px]">ƯU ĐÃI NGẬP TRÀN</h2>
                            <ul className="text-white">
                                <li className="list-disc">Tặng 10 triệu đồng vào tài khoản VinClub/xe</li>
                                <li className="list-disc">
                                    Gửi xe miễn phí (dưới 5 tiếng) và ưu tiên đỗ tại mọi địa điểm thuộc hệ sinh thái
                                    Vingroup.
                                </li>
                                <li className="list-disc">
                                    Sạc pin miễn phí tại các trạm sạc V-GREEN tới hết 01/07/2025.
                                </li>
                                <li className="list-disc">
                                    Cư dân Vinhomes sở hữu VF 5 Plus sẽ có đặc quyền gửi xe và sạc điện miễn phí ở các
                                    bãi đỗ của Vinhomes trong vòng 2 năm và hỗ trợ lắp sạc tại nhà với chi phí hỗ trợ
                                    lên đến 10.000.000 VNĐ/hộ.
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className="w-full flex justify-center" style={{ background: colors.bg }}>
                        <div
                            className="w-[60%] flex flex-col gap-[24px] items-center py-[16px]"
                            style={{ background: colors.bg }}
                        >
                            <Installment title={car.title} />

                            <div className="w-full bg-white rounded-[4px] shadow overflow-hidden">
                                <LabelCustom label={`thông số kĩ thuật ${car.title}`} />
                                <div className="w-full p-[8px]">
                                    <div className="flex justify-between items-stretch mb-[20px]">
                                        <div className="w-[45%]">
                                            <p>
                                                {car.title} có kích thước nhỏ gọn, trẻ trung, cá tính, giúp cho xe di
                                                chuyển linh hoạt qua các đường phố đông đúc một cách dễ dàng. Các thông
                                                số cụ thể như sau:
                                            </p>
                                        </div>

                                        <div className="w-[45%]">
                                            <iframe
                                                className="w-full"
                                                height="315"
                                                src={car.url_video_demo}
                                                title="YouTube video player"
                                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                            ></iframe>
                                        </div>
                                    </div>

                                    <TableParameter car={car} />
                                </div>
                            </div>

                            <div className="w-full bg-white rounded-[4px] shadow overflow-hidden">
                                <LabelCustom label={`thông tin nội thất ${car.title}`} />
                                <div className="w-full p-[8px]">
                                    <TableIntorior car={car} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ) : null}
        </div>
    );
};

export default CarDetail;
