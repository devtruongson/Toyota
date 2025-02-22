import { useEffect, useRef, useState } from 'react';
import { useAppSelector } from '../../../../app/hooks';
import { ICar } from '../../../../utils/interface';
import { getDetailCarService } from '../../../../services/carService';
import { HttpStatusCode } from 'axios';
import { Col, Row } from 'antd';
import { defaultImageCar, imageShowroom } from '../../../../constants';
import { colors } from '../../../../constants/colors';
import { formatVND } from '../../../../helpers/formatVND';
import Installment from '../common/Installment/Installment';
import LabelCustom from '../common/LabelCustom/LabelCustom';
import TableParameter from '../common/TableParameter/TableParameter';
import TableIntorior from '../common/TableIntorior/TableIntorior';
import DetailInfo from '../common/DetailInfo/DetailInfo';
import SpecialOffers from '../common/SpecialOffers/SpecialOffers';
import { getLinkImage } from '../../../../helpers/getLinkImage';

const CarDetail = () => {
    const carId = useAppSelector((state) => state.currentCar);
    const [car, setCar] = useState<ICar | null>(null);
    const [iamgeActive, setImageActive] = useState('');

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
                setImageActive(
                    res?.data?.car_features[0]?.image_url
                        ? getLinkImage(res?.data?.car_features[0]?.image_url)
                        : defaultImageCar,
                );
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
                                <Col span={16}>
                                    <div className="w-full">
                                        <img src={iamgeActive} alt="image" className="w-full" />
                                    </div>

                                    <div className=" grid grid-cols-8">
                                        {car.car_features && car.car_features.length > 0
                                            ? car.car_features.map((item) => {
                                                  return (
                                                      <div
                                                          key={item.id}
                                                          className=""
                                                          onClick={() => setImageActive(getLinkImage(item.image_url))}
                                                      >
                                                          <img src={getLinkImage(item.image_url)} alt="image" />
                                                      </div>
                                                  );
                                              })
                                            : null}
                                    </div>
                                </Col>
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
                                <DetailInfo title={car.title} type={car.model} />
                            </Col>
                        </Row>
                    </div>

                    <div className="w-full flex justify-center py-[20px]">
                        <SpecialOffers type={car.model} />
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
