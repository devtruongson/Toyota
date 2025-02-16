import CountUp from 'react-countup';

const Introduce = () => {
    return (
        <div className="bg-[#f4f8fa] w-full flex flex-col items-center pt-[50px]">
            <div className="w-[60%] flex justify-center items-stretch">
                <div className="w-[50%]">
                    <iframe
                        className="w-full"
                        height="315"
                        src="https://www.youtube.com/embed/gnAyuoSDPpE"
                        title="YouTube video player"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    ></iframe>
                </div>

                <div className="w-[50%] px-[20px]">
                    <p className="text-center text-[24px] text-red-400 font-[500] mb-[8px]">VỀ CHÚNG TÔI</p>
                    <p className="mb-[8px]">
                        Ngày 01/11/2019, Đại lý Vinfast Chevrolet Newway đã chính thức trở thành đại lý ủy quyền xe ô tô
                        Vinfast 3S lớn nhất tại Việt Nam, chuyên cung cấp các sản phẩm ô tô: Vinfast Lux SA2.0, Vinfast
                        Lux A2.0, Vinfast Fadil, Chevrolet Colorado, Chevrolet Trailblazer, và cung cấp dịch vụ sửa
                        chữa, bảo dưỡng, bảo hành xe Vinfast & xe Chevrolet.
                    </p>
                    <p>
                        Tiền thân là đại lý Chevrolet Newway, là đại lý 3S lớn nhất của hãng General Motor tại Việt Nam,
                        nhiều năm liền đạt kỷ lục bán xe cao nhất dẫn đầu hệ thống các đại lý Chevrolet tại Việt Nam &
                        khu vực Đông Nam Á, nay là đại lý Vinfast Chevrolet Newway.
                    </p>
                </div>
            </div>

            <div className="w-[60%] flex py-[40px]">
                <div className="text-[32px] font-[500] w-[25%] flex flex-col items-center">
                    <CountUp start={0} end={12680} duration={2} />
                    <p className="text-[20px] font-[300]">Xe đã bán</p>
                </div>
                <div className="text-[32px] font-[500] w-[25%] flex flex-col items-center">
                    <CountUp start={0} end={14680} duration={2} />
                    <p className="text-[20px] font-[300]">Khách hàng thân thiết</p>
                </div>
                <div className="text-[32px] font-[500] w-[25%] flex flex-col items-center">
                    <CountUp start={0} end={200} duration={2} />
                    <p className="text-[20px] font-[300]">Công nhân viên</p>
                </div>
                <div className="text-[32px] font-[500] w-[25%] flex flex-col items-center">
                    <CountUp start={0} end={2} duration={2} />
                    <p className="text-[20px] font-[300]">Chi nhánh chính thức</p>
                </div>
            </div>

            <div className="w-[60%] flex justify-between items-stretch">
                <div className="w-[45%]">
                    <div className=""></div>
                    <p>
                        Nằm tại vị trí đắc địa nhất Hà Nội, 183 – 185 Yên Lãng, ngay cạnh ngã 3 đường Láng giao với phố
                        Yên Lãng, có diện tích hơn 2000 m2, bao gồm: Showroom trưng bày dòng xe ô tô Vinfast và xe ô tô
                        Chevrolet, trưng bày phụ kiện đa dạng, được thiết kế và xây dựng theo tiêu chuẩn mới nhất của
                        hãng ô tô Vinfast, cùng với 2 xưởng dịch vụ sát cạnh được trang bị đồng bộ hệ thống các thiết bị
                        máy móc hiện đại nhất.
                    </p>
                </div>

                <div className="w-[45%]">
                    <div className=""></div>
                    <p>
                        Với diện tích trên 4.000m2, bao gồm khu bán hàng, văn phòng & xưởng dịch vụ riêng biệt, đảm bảo
                        mang đến dịch vụ tiêu chuẩn tốt nhất trong tất cả các đại lý của hãng ô tô Vinfast. Xưởng dịch
                        vụ được thiết kế đầy đủ theo tiêu chuẩn của hãng, bao gồm: Khu cố vấn dịch vụ, Khu vực sửa chữa
                        máy gầm, điện, Khu vực gò sơn, Khu vực dọn nội thất, rửa xe, Khu vực cung cấp phụ tùng chính
                        hãng, luôn đáp ứng nhanh chóng đầy đủ tất cả các yêu cầu về kỹ thuật và chất lượng sửa chữa của
                        khách hàng khi sử dụng dịch vụ tại đây.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Introduce;
