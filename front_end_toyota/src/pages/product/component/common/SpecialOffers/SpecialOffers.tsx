type Props = {
    type: string;
};

const SpecialOffers = ({ type }: Props) => {
    return (
        <>
            {type === 'electric' ? (
                <div className="bg-black/30 px-[40px] pt-[16px] pb-[16px] rounded-lg w-[60%]">
                    <h2 className="text-white font-bold text-lg text-center mb-[20px]">ƯU ĐÃI NGẬP TRÀN</h2>
                    <ul className="text-white">
                        <li className="list-disc">Tặng 10 triệu đồng vào tài khoản VinClub/xe</li>
                        <li className="list-disc">
                            Gửi xe miễn phí (dưới 5 tiếng) và ưu tiên đỗ tại mọi địa điểm thuộc hệ sinh thái Vingroup.
                        </li>
                        <li className="list-disc">Sạc pin miễn phí tại các trạm sạc V-GREEN tới hết 01/07/2025.</li>
                        <li className="list-disc">
                            Cư dân Vinhomes sở hữu VF 5 Plus sẽ có đặc quyền gửi xe và sạc điện miễn phí ở các bãi đỗ
                            của Vinhomes trong vòng 2 năm và hỗ trợ lắp sạc tại nhà với chi phí hỗ trợ lên đến
                            10.000.000 VNĐ/hộ.
                        </li>
                    </ul>
                </div>
            ) : (
                <div className="bg-black/30 px-[40px] pt-[16px] pb-[16px] rounded-lg w-[60%]">
                    <h2 className="text-white font-bold text-lg text-center mb-[20px]">ƯU ĐÃI NGẬP TRÀN</h2>
                    <ul className="text-white">
                        <li className="list-disc">Tặng 10 triệu đồng vào tài khoản VinClub/xe khi mua xe.</li>
                        <li className="list-disc">Miễn phí 1 năm bảo dưỡng định kỳ theo chính sách của hãng.</li>
                        <li className="list-disc">Giảm 50% phí đăng ký biển số xe tại một số tỉnh/thành phố.</li>
                        <li className="list-disc">
                            Ưu đãi đặc biệt cho khách hàng sở hữu căn hộ Vinhomes: miễn phí gửi xe tại các bãi đỗ của
                            Vinhomes trong 1 năm.
                        </li>
                    </ul>
                </div>
            )}
        </>
    );
};

export default SpecialOffers;
