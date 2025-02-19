type Props = {
    type: string;
    title: string;
};

const DetailInfo = ({ type, title }: Props) => {
    return (
        <>
            {type === 'electric' ? (
                <div className="bg-white py-[8px] px-[12px] h-full rounded-[4px] shadow">
                    <p className="text-[20px] uppercase mb-[20px]">Giá thuê pin {title}</p>
                    <p className="mb-[10px]">
                        Giá thuê pin {title} là số tiền hàng tháng khách hàng phải trả cho VinFast khi mua xe theo hình
                        thức thuê pin.
                    </p>
                    <p className="mb-[10px]">
                        Giá thuê pin này phụ thuộc vào chính sách bán hàng ở tùng thời điểm. Hiện tại, giá thuê pin{' '}
                        {title} phụ thuộc vào quãng đường di chuyển theo tháng của khách hàng.
                    </p>
                    <ul className="mb-[10px]">
                        <li>{`• Số Km/ tháng <=1.500Km: phí thuê pin là: 2.300.000 VNĐ.`}</li>
                        <li>{`• Số Km/ tháng >1.500Km và <3.000Km: phí thuê pin là: 3.500.000 VNĐ.`}</li>
                        <li>{`• Số Km/ tháng >3.500Km: phí thuê pin là: 5.800.000 VNĐ.`}</li>
                    </ul>
                    <p className="text-center italic">(Đã bao gồm VAT)</p>
                </div>
            ) : (
                <div className="bg-white py-[8px] px-[12px] h-full rounded-[4px] shadow">
                    <p className="text-[20px] uppercase mb-[20px]">Chính sách bảo hành {title}</p>
                    <p className="mb-[10px]">
                        Chính sách bảo hành {title} là cam kết của hãng trong việc bảo trì và sửa chữa xe trong một
                        khoảng thời gian hoặc số km nhất định nhằm đảm bảo chất lượng và sự an tâm cho khách hàng.
                    </p>
                    <p className="mb-[10px]">
                        Chính sách bảo hành này có thể thay đổi tùy theo từng thời điểm và điều kiện cụ thể. Hiện tại,
                        thời gian bảo hành {title} được quy định như sau:
                    </p>
                    <ul className="mb-[10px]">
                        <li>{`• Dưới 50.000 km hoặc 2 năm: Bảo hành toàn bộ xe, bao gồm động cơ, hộp số và hệ thống truyền động.`}</li>
                        <li>{`• Từ 50.000 km đến 100.000 km hoặc 3 năm: Bảo hành giới hạn với một số bộ phận quan trọng như động cơ và hộp số.`}</li>
                        <li>{`• Trên 100.000 km hoặc sau 3 năm: Không áp dụng bảo hành, khách hàng có thể sử dụng các gói bảo trì mở rộng của hãng.`}</li>
                    </ul>
                    <p className="text-center italic">
                        (Chính sách có thể thay đổi tùy theo điều kiện sử dụng và quy định của hãng.)
                    </p>
                </div>
            )}
        </>
    );
};

export default DetailInfo;
