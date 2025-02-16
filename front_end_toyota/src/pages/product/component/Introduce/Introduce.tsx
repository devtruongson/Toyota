import CountUp from 'react-countup';
import { colors } from '../../../../constants/colors';
import { CarFilled } from '@ant-design/icons';
import SlideCommon from '../common/SlideCommon/SlideCommon';

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

            {/* Địa chỉ */}
            <div className="w-[60%] flex justify-between items-stretch py-[20px]">
                <div className="w-[45%]">
                    <div className="flex justify-center items-center bg-gray-100 mb-[20px]">
                        <div className="relative w-full h-[250px] cursor-pointer overflow-hidden group">
                            <div className="bg-white absolute inset-0  flex flex-col items-center justify-center gap-[10px] transition-all duration-500 ease-in-out transform group-hover:-translate-y-full group-hover:opacity-0">
                                <div className="w-[60px] h-[60px] bg-red-500 rounded-[100%] flex justify-center items-center text-white">
                                    <CarFilled className="text-[24px]" />
                                </div>
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
                                <div className="w-[60px] h-[60px] bg-red-500 rounded-[100%] flex justify-center items-center text-white">
                                    <CarFilled className="text-[24px]" />
                                </div>
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
            <div className="py-[40px] flex flex-col items-center" style={{ background: colors.bg }}>
                <LabelCommon label="thành tựu" />

                <div className="w-[60%] bg-white p-[20px] mb-[40px] rounded-[8px]">
                    <p className="mb-[10px]">
                        Sau gần 10 năm hình thành phát triển, sau hơn 3 năm gia nhập hãng Chevrolet, đại lý Chevrolet
                        Newway đã từng bước khẳng định được vị thế cũng như tạo được uy tín lớn trên thị trường kinh
                        doanh ô tô trong nước.
                    </p>
                    <ul className="list-disc pl-5">
                        <li>
                            Năm 2017: Là đại lý đạt doanh số bán xe cao nhất toàn quốc với hơn 1078 xe – xác lập kỷ lục
                            bán xe tại Việt Nam
                        </li>
                        <li>
                            Năm 2017: <span> Đại lý đạt doanh số bán xe Chevrolet Colorado cao nhất toàn quốc</span>
                        </li>
                        <li>
                            Năm 2018 với 1430 xe – phá vỡ kỷ lục bán xe của chính mình & tiếp tục là đại lý duy nhất đạt
                            kỷ lục mới cho Chevrolet
                        </li>
                        <li>Hiện là đại lý số 1 tại Việt Nam & luôn phấn đấu giữ vững ngôi vị cao nhất đó.</li>
                    </ul>
                </div>

                <div className="w-[640px]">
                    <SlideCommon
                        listImage={[
                            'https://vinfastnewway.com.vn/wp-content/uploads/2019/11/KetQuaVuotBac3-640x360.jpg',
                            'https://vinfastnewway.com.vn/wp-content/uploads/2019/11/KetQuaVuotBac-640x360.jpg',
                            'https://vinfastnewway.com.vn/wp-content/uploads/2019/11/KetQuaVuotBac1-640x360.jpg',
                            'https://vinfastnewway.com.vn/wp-content/uploads/2019/11/KetQuaVuotBac3-640x360.jpg',
                            'https://vinfastnewway.com.vn/wp-content/uploads/2019/11/KetQuaVuotBac3-640x360.jpg',
                        ]}
                    />
                </div>
            </div>

            {/* Đội ngũ nhân sự */}
            <div className="w-full flex flex-col items-center bg-white py-[40px]">
                <LabelCommon label="Đội ngũ nhân sự" />

                <div className="w-[60%] mb-[40px]">
                    <p className="mb-[10px]">
                        Luôn quan niệm Cán bộ công nhân viên là nguồn lực quan trọng tạo nên sự thành công và phát triển
                        bền vững của công ty. Newway luôn hướng đến việc xây dựng một đội ngũ nhân sự có niềm đam mê; ý
                        chí mạnh mẽ; thái độ làm việc tích cực; tính sáng tạo cao và ý thức trau dồi chuyên môn; tác
                        phong làm việc chuyên nghiệp để cung cấp các dịch vụ hoàn hảo nhất tới Khách hàng.Với nền tảng
                        kinh nghiệm được xây dựng và tích lũy gần 10 năm hình thành và phát triển, bằng sự tận tâm và nỗ
                        lực của hơn 200 CBCNV, chúng tôi cam kết:
                    </p>

                    <ul className="list-disc pl-5">
                        <li>Đại lý số 1 về chất lượng dịch vụ.</li>
                        <li>Tư vấn bán hàng chuyên nghiệp.</li>
                        <li>Dịch vụ hỗ trợ khách hàng sau bán hàng tốt nhất.</li>
                        <li>Tư vấn kỹ thuật sửa chữa thay thế tốt nhất.</li>
                        <li>Nỗ lực chăm sóc khách hàng chu đáo nhất.</li>
                    </ul>
                </div>

                <div className="w-[50%]">
                    <SlideCommon
                        listImage={[
                            'https://vinfastnewway.com.vn/wp-content/uploads/2019/11/dai-ly-vinfast-newway-ban-xe-03.jpg',
                            'https://vinfastnewway.com.vn/wp-content/uploads/2019/10/doanhnhan201906.jpg',
                            'https://vinfastnewway.com.vn/wp-content/uploads/2019/11/doi-ngu-nhan-su-02.jpg',
                            'https://vinfastnewway.com.vn/wp-content/uploads/2019/11/doi-ngu-nhan-su-03.jpg',
                            'https://vinfastnewway.com.vn/wp-content/uploads/2019/11/doi-ngu-nhan-su-03.jpg',
                        ]}
                    />
                </div>
            </div>

            {/* HOẠT ĐỘNG XÃ HỘI */}
            <div className="w-full flex flex-col items-center bg-white py-[40px]" style={{ background: colors.bg }}>
                <LabelCommon label="HOẠT ĐỘNG XÃ HỘI" />

                <div className="w-[60%] mb-[40px]">
                    <p className="mb-[10px]">
                        Bên cạnh những hoạt động kinh doanh hàng ngày, Vinfast Chevrolet Newway còn thể hiện “trách
                        nhiệm với xã hội” thông qua các hoạt động cộng đồng. Trong những năm qua, ban lãnh đạo cùng toàn
                        thể CBCNV Công ty đã tổ chức nhiều hoạt động ý nghĩa, các chương trình từ thiện đến các tỉnh
                        vùng sâu, vùng xa:
                    </p>

                    <ul className="list-disc pl-5">
                        <li>
                            Lắp đặt sân chơi, tặng áo ấm & đồ dùng cho các em nhỏ tại 3 điểm trường: Pá Hốc, Pa Cư Sáng,
                            tiểu học Hang Chú tại tỉnh Sơn La;
                        </li>
                        <li>
                            Trao áo ấm & các suất quà tết cho các hộ nghèo tại xã Tân Lạc, Hòa Bình mong các gia đình có
                            1 cái tết ấm áp;
                        </li>
                        <li>
                            Vượt gần 1000km để mang hơi ấm tới cho các em nhỏ tại xã Nà Toong, Tuần Giáo, Điện Biên;
                        </li>
                        <li>
                            Trao các suất quà tới các gia đình khó khăn, bị bệnh hiểm nghèo tại quận Hải An, TP Hải
                            Phòng
                        </li>
                    </ul>
                </div>

                <div className="w-[50%]">
                    <SlideCommon
                        listImage={[
                            'http://vinfastnewway.com.vn/wp-content/uploads/2019/11/tu-thien-02.jpg',
                            'https://vinfastnewway.com.vn/wp-content/uploads/2019/11/tu-thien-01.jpg',
                            'https://vinfastnewway.com.vn/wp-content/uploads/2019/11/tu-thien-05.jpg',
                            'https://vinfastnewway.com.vn/wp-content/uploads/2019/11/tu-thien-03.jpg',
                            'https://vinfastnewway.com.vn/wp-content/uploads/2019/11/tu-thien-04.jpg',
                        ]}
                    />
                </div>
            </div>
        </div>
    );
};

export default Introduce;

const LabelCommon = ({ label }: { label: string }) => {
    return <p className="text-center font-[500] text-[28px] mb-[28px] text-red-500 uppercase">{label}</p>;
};
