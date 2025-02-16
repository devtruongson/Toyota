import { SunFilled } from '@ant-design/icons';
import { colors } from '../../../../constants/colors';
import BannerPage from '../common/BannerPage/BannerPage';

const Vision = () => {
    return (
        <div className="bg-[red] flex flex-col items-center pb-[40px]" style={{ background: colors.bg }}>
            <BannerPage title="Tầm Nhìn – Sứ Mệnh" desciption="Tầm Nhìn – Sứ Mệnh" />
            <p className="text-center text-[28px] font-[500] mt-[40px] mb-[20px]">
                TẦM NHÌN, SỨ MỆNH & GIÁ TRỊ CỐT LÕI <br /> CỦA VINFAST CHEVROLET NEWWAY
            </p>
            <img
                src="https://vinfastnewway.com.vn/wp-content/uploads/2019/11/Lien-He-Vinfast-Newway.jpg"
                alt="image"
                className="w-[1000px] mb-[80px]"
            />
            <div className="w-[60%] rounded-[8px] bg-white p-[10px] mb-[20px]">
                <p className="text-red-500 mb-[20px] font-[500]">1. TẦM NHÌN</p>
                <p>
                    Đại lý Vinfast Chevrolet Newway đã & đang là đại lý số 1 tại Việt Nam, là đại lý đứng đầu Đông Nam Á
                    & luôn phấn đấu giữ vững ngôi vị cao nhất đó trong những năm tiếp theo.
                </p>
            </div>
            <div className="text-red-500 mb-[20px]">
                <SunFilled className="text-[48px] text-red-500" />
            </div>
            <div className="w-[60%] rounded-[8px] bg-white p-[10px] mb-[20px]">
                <p className="text-red-500 mb-[20px] font-[500]">2. SỨ MỆNH</p>
                <p>
                    Sứ mệnh của Vinfast Chevrolet Newway là cam kết cung cấp các sản phẩm và dịch vụ về ô tô có chất
                    lượng và uy tín hàng đầu bằng chính sự tận tâm, chuyên nghiệp và trách nhiệm cao của mình với khách
                    hàng
                </p>
            </div>
            <div className="text-red-500 mb-[20px]">
                <SunFilled className="text-[48px] text-red-500" />
            </div>

            <div className="w-[60%] rounded-[8px] bg-white p-[10px] mb-[20px]">
                <p className="text-red-500 mb-[20px] font-[500]">3. GIÁ TRỊ CỐT LÕI</p>
                <div className="border-[2px] border-dashed border-[red] rounded-[20px] p-[16px] mb-[40px]">
                    <p className="text-center">
                        Đối với khách hàng: Sứ mệnh được phục vụ – Chất lượng và uy tín
                        <br />
                        Đối với cá nhân: Tôn trọng và kỷ luật – Nỗ lực và tận tâm
                        <br />
                        Đối với tập thể: Hợp tác và sẻ chia – Đoàn kết để phát triển
                    </p>
                </div>

                <TextCommon
                    title="3.1 Sứ mệnh được phục vụ:"
                    description="Chúng tôi luôn cảm thấy vui mừng và tự hào khi được phục vụ khách hàng & luôn cam kết mang lại sản phẩm và dịch vụ chất lượng và uy tín nhất tới cho khách hàng."
                />
                <TextCommon
                    title="3.2 Tôn trọng và kỷ luật – Nỗ lực và tận tâm: "
                    description="Chúng tôi đều hiểu rằng để xây dựng một Công ty phát triển bền vững và chuyên nghiệp thì mỗi thành viên phải tôn trọng tất cả các quy định và văn hóa chung của Công ty, tôn trọng nhau trong giao tiếp ứng xử hàng ngàyvới tinh thần kỷ luật, rèn rũa bản thân nghiêm túc. Bên cạnh đó để tạo giá trị đóng góp vào hiệu quả chung cho Công ty chúng tôi phải luôn nỗ lực và tận tâm công hiến hết mình."
                />
                <TextCommon
                    title="3.3 Hợp tác và sẻ chia – Đoàn kết và phát triển:"
                    description="Chúng tôi luôn chủ động hợp tác và sẻ chia cùng đồng nghiệp, cùng người quản lý để tìm giải pháp tối ưu, hiệu quả nhất vì lợi ích chung của Công ty. Chúng tôi luôn nỗ lực mọi lúc để xây dựng tinh thần đoàn kết nội bộ, gắn kết mọi thành viên trong công ty để cùng nhau phát triển và đạt được mục tiêu chung. Chúng tôi tập trung vào việc hợp tác và luôn nghĩ đến giải pháp thay vì thỏa hiệp, hoặc tìm lý do. Chúng tôi luôn có trách nhiệm hoàn thành xuất sắc nhiệm vụ của mình và luôn sẵn lòng chia sẻ, giúp đỡ thành viên trong Công ty khi cần thiết."
                />
                <TextCommon
                    title="3.4 Cam kết xuất sắc:"
                    description="Chúng tôi cam kết nỗ lực hết mình, luôn tự chủ với trách nhiệm cao nhất cho đến khi hoàn thành xuất sắc nhiệm vụ được giao. Chúng tôi hoàn toàn tập trung suy nghĩ, năng lượng để đạt thành quả của mọi việc mà Chúng tôi đang làm. Chúng tôi cam kết luôn gắn bó với tầm nhìn, sứ mệnh, văn hóa và sự thành công của Newway."
                />
                <TextCommon
                    title="3.5 Giao tiếp tích cực:"
                    description="Chúng tôi luôn giao tiếp một cách tích cực với đồng nghiệp, với cấp quản lý, lãnh đạo trong Công ty, với khách hàng và với các đối tác trước đám đông lẫn khi trao đổi riêng. Chúng tôi giao tiếp với mục đích tốt đẹp thông qua những cuộc đối thoại tích cực và tôn trọng. Chúng tôi không bao giờ nói hay nghe những lời chế nhạo, nói xấu, chê bai, chỉ trích hay những câu chuyện tầm phào. Chúng tôi thừa nhận những điều mình nói là sự thật xét tại thời điểm phát ngôn và tôi chịu trách nhiệm trước những phản hồi từ những người khác. Chúng tôi luôn xin lỗi về bất kỳ sai sót nào trước tiên và ngay sau đó tìm giải pháp. Chúng tôi chỉ thảo luận riêng các vấn đề cá nhân với những người có liên quan trên tinh thần hợp tác và mục đích tốt đẹp."
                />
                <TextCommon
                    title="3.6 Chính trực và nhất quán:"
                    description="Chúng tôi luôn nói sự thật. Chúng tôi luôn thực hiện những gì mình đã hứa. Chúng tôi chỉ cam kết với bản thân và những người khác những điều mà tôi đã sẵn sàng và có ý định thực hiện. Chúng tôi thông báo ngay khi biết có những cam kết có thể không thực hiện được và có giải pháp xử lý vấn đề ngay lập tức. Chúng tôi nhất quán trong hành động để khách hàng và đồng nghiệp có thể cảm thấy thoải mái khi làm việc với tôi. Chúng tôi tuân thủ kỷ cương trong công việc để đạt kết quả, phát triển và thành công một cách nhất quán."
                />
                <TextCommon
                    title="3.7 Trách nhiệm:"
                    description="Mỗi CBNV dù ở vị trí chức năng nào khi làm bất cứ công việc gì cũng cần thực hiện bằng tất cả trí lực và tinh thần, tâm huyết của bản thân, toàn tâm toàn ý đảm bảo làm tròn nhiệm vụ, công việc được giao. Tuyệt đối không bao biện cho những lỗi sai của bản thân, đùn đẩy trách nhiệm, mà cần chủ động tìm cách khắc phục trên tinh thần xây dựng và hợp tác vì hiệu quả chung của Công ty. CBNV Newway không làm việc qua loa, tắc trách mà cần có trách nhiệm với những điều bản thân đã cam kết với khách hàng và Công ty, có trách nhiệm với những công việc được Công ty giao phó, và có trách nhiệm chung tay xây dựng phát triển Công ty, đảm bảo uy tín và nâng tầm thương hiệu Newway"
                />
            </div>
        </div>
    );
};

export default Vision;

const TextCommon = ({ title, description }: { title: string; description: string }) => {
    return (
        <p className="mb-[10px]">
            <span className="italic font-[500]">{title}</span>
            {description}
        </p>
    );
};
