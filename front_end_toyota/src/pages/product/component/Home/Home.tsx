import { HttpStatusCode } from 'axios';
import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import { useAppSelector } from '../../../../app/hooks';
import { bannerHomes, naviHome, reasonChooses } from '../../../../constants';
import { colors } from '../../../../constants/colors';
import { getAllBlogs } from '../../../../services/blogService';
import { IBlog } from '../../../../utils/interface';
import CardBlog from '../CardBlog/CardBlog';
import CardCar from '../common/CardCar/CardCar';
import './Home.css';
const Home = () => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
    };

    const [blogs, setBlogs] = useState<IBlog[]>([]);
    const { carActive } = useAppSelector((state) => state);
    const cars = useMemo(() => {
        return {
            electric: carActive.filter((item) => item.model === 'electric'),
            gasoline: carActive.filter((item) => item.model !== 'electric'),
        };
    }, [carActive]);

    useEffect(() => {
        const fetch = async () => {
            const resBlog = await getAllBlogs(1, 10);

            if (resBlog.code === HttpStatusCode.Ok) {
                setBlogs(resBlog.data.items);
            }
        };

        fetch();
    }, []);

    return (
        <div className="w-[100%] overflow-x-hidden bg-[#f4f8fa]">
            <div className="w-[100%] mx-auto banner">
                <Slider {...settings}>
                    {bannerHomes.map((item, index) => {
                        return (
                            <div className="w-full" key={index}>
                                <img src={item} className="object-cover" alt={`Slide ${index}`} />
                            </div>
                        );
                    })}
                </Slider>
            </div>
            <div className="w-full bg-[#f4f8fa] h-[200px] relative">
                <div className="absolute h-[100%] w-[100%] flex justify-center items-center opacity-[0.03]">
                    <p className="text-[60px] uppercase ">Vinfast chevrolet</p>
                </div>

                <div className="h-[100%] flex-col flex justify-center items-center">
                    <p className="text-center text-[40px] uppercase font-[500] tracking-widest">Sản phẩm</p>
                    <p className="uppercase text-[20px] tracking-widest">Xe vinfast</p>
                </div>
            </div>

            <div className="w-full pb-[40px] pt-[20px] flex flex-col justify-center items-center bg-[white] mb-[100px]">
                {/* danh sach xe dien */}
                <div className="w-[60%] px-[15px] py-[10px] ">
                    <div className="w-[100%] flex justify-center items-center mb-[10px]">
                        <p className="uppercase font-[800] text-[28px] text-[#2c72c6] whitespace-nowrap mr-[20px]">
                            động cơ điện
                        </p>
                        <div className=" flex-grow border-[1px] border-solid border-[#2c72c6]"></div>
                    </div>
                    <div className="w-full grid grid-cols-3 gap-[20px]">
                        {cars.electric && cars.electric.length > 0
                            ? cars.electric.map((car) => {
                                  return <CardCar key={car.id} car={car} />;
                              })
                            : null}
                    </div>
                </div>
            </div>

            <div className="w-full pb-[40px] pt-[20px] flex flex-col justify-center items-center bg-[white] ">
                {/* danh sach xe dien */}
                <div className="w-[60%] px-[15px] py-[10px] ">
                    <div className="w-[100%] flex justify-center items-center mb-[10px]">
                        <p className="uppercase font-[800] text-[28px] text-[#2c72c6] whitespace-nowrap mr-[20px]">
                            động cơ xăng
                        </p>
                        <div className=" flex-grow border-[1px] border-solid border-[#2c72c6]"></div>
                    </div>
                    <div className="w-full grid grid-cols-3 gap-[20px]">
                        {cars.gasoline && cars.gasoline.length > 0
                            ? cars.gasoline.map((car) => {
                                  return <CardCar key={car.id} car={car} />;
                              })
                            : null}
                    </div>
                </div>
            </div>

            <div className="w-full flex justify-center" style={{ background: colors.bg }}>
                <div className="w-[60%]">
                    <div className="w-full bg-[#f4f8fa] h-[200px] relative">
                        <div className="absolute h-[100%] w-[100%] flex justify-center items-center opacity-[0.03]">
                            <p className="text-[60px] uppercase ">Vinfast chevrolet</p>
                        </div>

                        <div className="h-[100%] flex-col flex justify-center items-center">
                            <p className="text-center text-[40px] uppercase font-[500] tracking-widest">Tin tức</p>
                            <p className="uppercase text-[20px] tracking-widest">newway</p>
                        </div>
                    </div>

                    <div className="w-full flex flex-col justify-center items-center">
                        <div className="w-[100%] px-[15px] py-[20px] bg-[white]">
                            <div className="w-[100%] flex justify-center items-center ">
                                <p className="uppercase font-[800] text-[28px] text-[#2c72c6] whitespace-nowrap mr-[20px]">
                                    Hỗ trợ mua xe
                                </p>
                                <div className=" flex-grow border-[1px] border-solid border-[#2c72c6]"></div>
                            </div>
                            <div className="w-full grid grid-cols-3 gap-[16px]">
                                {blogs && blogs.length > 0
                                    ? blogs.map((blog) => {
                                          return (
                                              <CardBlog
                                                  id={blog.id}
                                                  isVertical
                                                  key={blog.id}
                                                  title={blog.title}
                                                  description={blog.meta_description}
                                                  img={blog.thumbnail}
                                              />
                                          );
                                      })
                                    : null}
                            </div>
                        </div>
                    </div>

                    <div className="h-[250px] w-full flex justify-center items-center">
                        <p className="uppercase text-[28px] font-[500]">LÝ DO BẠN NÊN CHỌN CHÚNG TÔI</p>
                    </div>

                    <div className="bg-[white] flex justify-center items-stretch p-[20px]">
                        {reasonChooses.map((item, index) => {
                            return (
                                <div className="w-[25%] p-[4px] hover:shadow-2xl" key={index}>
                                    <div className="flex justify-center mb-[20px]">
                                        <img src={item.img} alt="image" className="w-[100px]" />
                                    </div>
                                    <p className="text-[20px] uppercase text-center mb-[20px]">{item.title}</p>

                                    <p className="text-[16px]">{item.description}</p>
                                </div>
                            );
                        })}
                    </div>

                    <div className="mt-[100px] bg-[white] px-[100px] py-[100px] flex justify-between items-center">
                        {naviHome.map((item, index) => {
                            return (
                                <Link to={item.href} key={index} className="w-[48%]">
                                    <div>
                                        <img src={item.img} alt="image" />
                                        <div className="px-[50px] py-[50px] flex flex-col justify-center items-center bg-[#f4f8fa] gap-[20px]">
                                            <p className="text-center text-[28px] uppercase">{item.title}</p>
                                            <button className="px-[32px] py-[10px] border-[1px] border-solid border-[#55595c] text-[#55595c] text-[24px] rounded-[4px] cursor-pointer hover:opacity-[0.7]">
                                                Xem chi tiết
                                            </button>
                                        </div>
                                    </div>
                                </Link>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
