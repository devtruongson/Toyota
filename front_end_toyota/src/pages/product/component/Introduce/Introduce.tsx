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
                    <LabelCommon label="VỀ CHÚNG TÔI" />
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

            <div className="w-[60%] flex justify-between items-stretch py-[20px]">
                <div className="w-[45%]">
                    <div className="flex justify-center items-center bg-gray-100 mb-[20px]">
                        <div className="relative w-full h-[250px] cursor-pointer overflow-hidden group">
                            <div className="bg-white absolute inset-0  flex flex-col items-center justify-center gap-[10px] transition-all duration-500 ease-in-out transform group-hover:-translate-y-full group-hover:opacity-0">
                                <div className="w-[60px] h-[60px] bg-red-500 rounded-[100%]">car</div>
                                <p className="text-[28px] font-[500]">Trụ sở chính</p>
                                <p> Số 183 Yên Lãng, Thịnh Quang, Đống Đa, Hà Nội</p>
                            </div>
                            <div className="bg-black absolute inset-0 flex flex-col items-center gap-[10px] justify-center text-white transition-all duration-500 ease-in-out transform translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100">
                                <p className="text-[28px] font-[500]">Bản đồ chỉ đường</p>
                                <p>Click để mở bản đồ chi tiết chỉ đường đến Newway</p>
                                <button
                                    className="border-[1px] border-solid border-[#fff] px-[20px] py-[10px] hover:border-none hover:bg-red-500 cursor-pointer"
                                    onClick={() =>
                                        window.open(
                                            'https://www.google.com/search?q=vinfast-chevrolet-newway',
                                            '_blank',
                                        )
                                    }
                                >
                                    Xem bản đồ
                                </button>
                            </div>
                        </div>
                    </div>
                    <p>
                        Nằm tại vị trí đắc địa nhất Hà Nội, 183 – 185 Yên Lãng, ngay cạnh ngã 3 đường Láng giao với phố
                        Yên Lãng, có diện tích hơn 2000 m2, bao gồm: Showroom trưng bày dòng xe ô tô Vinfast và xe ô tô
                        Chevrolet, trưng bày phụ kiện đa dạng, được thiết kế và xây dựng theo tiêu chuẩn mới nhất của
                        hãng ô tô Vinfast, cùng với 2 xưởng dịch vụ sát cạnh được trang bị đồng bộ hệ thống các thiết bị
                        máy móc hiện đại nhất.
                    </p>
                </div>

                <div className="w-[45%]">
                    <div className="flex justify-center items-center bg-gray-100 mb-[20px]">
                        <div className="relative w-full h-[250px] cursor-pointer overflow-hidden group">
                            <div className="bg-white absolute inset-0  flex flex-col items-center justify-center gap-[10px] transition-all duration-500 ease-in-out transform group-hover:-translate-y-full group-hover:opacity-0">
                                <div className="w-[60px] h-[60px] bg-red-500 rounded-[100%]">car</div>
                                <p className="text-[28px] font-[500]"> Chi nhánh HOÀI ĐỨC</p>
                                <p>Cụm CN Lai Xá, Kim Chung, Hoài Đức, Hà Nội</p>
                            </div>
                            <div className="bg-black absolute inset-0 flex flex-col items-center gap-[10px] justify-center text-white transition-all duration-500 ease-in-out transform translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100">
                                <p className="text-[28px] font-[500]">Bản đồ chỉ đường</p>
                                <p>Click để mở bản đồ chi tiết chỉ đường đến chi nhánh Hoài Đức</p>
                                <button
                                    className="border-[1px] border-solid border-[#fff] px-[20px] py-[10px] hover:border-none hover:bg-red-500 cursor-pointer"
                                    onClick={() =>
                                        window.open(
                                            'https://www.google.com/maps/place//@21.0581063,105.7253419,16.7z?entry=ttu&g_ep=EgoyMDI1MDIxMi4wIKXMDSoASAFQAw%3D%3D',
                                            '_blank',
                                        )
                                    }
                                >
                                    Xem bản đồ
                                </button>
                            </div>
                        </div>
                    </div>
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

            {/* Sản phẩm & Dịch vụ */}
            <div className="w-full bg-white flex flex-col items-center py-[50px]">
                <LabelCommon label="Sản phẩm & Dịch vụ" />
                <div className="w-[50%] flex flex-col items-center">
                    <img
                        src={'https://vinfastnewway.com.vn/wp-content/uploads/2019/08/vinfast.png'}
                        alt=""
                        className="w-[500px]"
                    />
                    <p className="text-[20px] uppercase">Đại Lý 3S</p>
                    <p className="text-[#5d5e5e]">Bán xe Ô tô Vinfast Fadil, Vinfast Lux A2.0, Vinfast SA2.0</p>
                    <p className="text-[#5d5e5e]">Dịch vụ Bảo dưỡng, Bảo hành, Sửa chữa xe ô tô Vinfast</p>
                </div>
            </div>

            {/* THÀNH TỰU */}
            <div className=""></div>
        </div>
    );
};

export default Introduce;

const LabelCommon = ({ label }: { label: string }) => {
    return <p className="text-center font-[500] text-[28px] mb-[28px] text-red-500 uppercase">{label}</p>;
};
