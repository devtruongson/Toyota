import { ICar } from '../../../../../utils/interface';

type Props = {
    car: ICar;
};

const TableParameter = ({ car }: Props) => {
    return (
        <div className="relative">
            <div
                className="absolute inset-0 bg-cover bg-center"
                style={{
                    backgroundImage:
                        "url('https://vinfastnewway.com.vn/wp-content/uploads/2022/08/he-thong-khung-gam-va-dong-co-vf-8.jpg')",
                    opacity: '0.25',
                    minHeight: '100%',
                }}
            ></div>
            <div className="w-full relative">
                <div className="w-full flex border-b-[1px] border-solid border-[#ddd] py-[8px]">
                    <div className="w-[50%]">
                        <p className="text-center font-[500] text-[16px]">thông số</p>
                    </div>
                    <div className="w-[50%]">
                        <p className="text-center font-[500] text-[16px]">thông số</p>
                    </div>
                </div>
                <RowCommon label="Cân nặng" value={`${car.weight}kg`} />
                <RowCommon label="Dung lượng pin" value={car.battery_capacity} />
                <RowCommon label="Phạm vi km" value={car.range_km} />
                <RowCommon label="Phanh" value={car.brake} />
                <RowCommon label="Phanh ABS" value={car.brake_abs} />
                <RowCommon label="EBD – Electronic Brakeforce Distribution" value={car.ebd} />
                <RowCommon label=" ESC – Electronic Stability Control" value={car.esc} />
                <RowCommon label="TCS – Traction Control System" value={car.tcs} />
                <RowCommon label="HSA – Hill Start Assist" value={car.hsa} />
                <RowCommon label="Bộ nhớ bất biến" value={car.rom} />
                <RowCommon label="Túi khí" value={car.air_bag} />
                <RowCommon label="Mã khóa thông minh" value={car.key_code} />
            </div>
        </div>
    );
};

export default TableParameter;

//https://vinfastnewway.com.vn/wp-content/uploads/2022/08/he-thong-khung-gam-va-dong-co-vf-8.jpg

type RowCommonProps = {
    label: string;
    value: string;
};
const RowCommon = ({ label, value }: RowCommonProps) => {
    return (
        <div className="flex justify-center items-stretch py-[8px] border-b-[1px] border-solid border-[#ddd]">
            <div className="w-[50%]">
                <p>{label} </p>
            </div>
            <div className="w-[50%] ">
                <p>{value}</p>
            </div>
        </div>
    );
};
