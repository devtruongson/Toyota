import { ICar } from '../../../../../utils/interface';

type Props = { car: ICar };

const TableIntorior = ({ car }: Props) => {
    return (
        <div className="w-full">
            <div className="w-full flex border-b-[1px] border-solid border-[#ddd] py-[8px]">
                <div className="w-[50%]">
                    <p className="text-center font-[500] text-[16px]">thông số</p>
                </div>
                <div className="w-[50%]">
                    <p className="text-center font-[500] text-[16px]">thông số</p>
                </div>
            </div>
            <RowCommon label="Màn hình" value={car.display} />
            <RowCommon label="Điều hòa" value={car.conditioning} />
            <RowCommon label="Hệ thống âm thanh" value={car.sound} />
            <RowCommon label="Usb" value={car.usb} />
            <RowCommon label="Bluetooth" value={car.bluetooth} />
            <RowCommon label="Gương" value={car.sun_visor} />
            <RowCommon label="Đèn" value={car.lights} />
        </div>
    );
};

export default TableIntorior;

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
