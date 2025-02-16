import { useEffect, useState } from 'react';
import { logoVinfast } from '../../../../constants';
import BannerPage from '../common/BannerPage/BannerPage';
import { getCarBuyModel } from '../../../../services/carService';
import { HttpStatusCode } from 'axios';
import { ICar } from '../../../../utils/interface';
import CardCar from '../common/CardCar/CardCar';

const Products = () => {
    const [cars, setCars] = useState<ICar[]>([]);

    useEffect(() => {
        const fetch = async () => {
            const res = await getCarBuyModel('electric');
            if (res.code === HttpStatusCode.Ok) {
                setCars(res.data);
            }
        };
        fetch();
    }, []);

    return (
        <div className="w-full bg-[#f4f8fa]">
            <BannerPage title="Sản phẩm" subtitle="Các sản phẩm hiện đang kinh doanh" desciption="Home - Sản phẩm" />

            <div className="py-[100px] px-[250px]">
                <div className="w-full flex justify-center  mb-[20px]">
                    <img src={logoVinfast} alt="logo" className="w-[180px] h-[50px]" />
                </div>
                <div className="w-full grid grid-cols-3 gap-[40px]">
                    {cars && cars.length > 0
                        ? cars.map((car) => {
                              return <CardCar car={car} key={car.id} />;
                          })
                        : null}
                </div>
            </div>
        </div>
    );
};

export default Products;
