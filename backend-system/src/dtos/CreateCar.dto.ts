import { IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateCarDTO {
    car_id: number;

    @IsNotEmpty({ message: 'Tiêu đề không được để trống' })
    @IsString({ message: 'Tiêu đề phải là một chuỗi' })
    title: string;

    @IsNotEmpty({ message: 'Meta sub title không được để trống' })
    @IsString({ message: 'Meta sub title phải là một chuỗi' })
    meta_sub_title: string;

    @IsBoolean()
    @IsOptional()
    is_show_form: boolean;

    @IsNotEmpty({ message: 'Mô tả không được để trống' })
    @IsString({ message: 'Mô tả phải là một chuỗi' })
    description: string;

    @IsNotEmpty({ message: 'Trọng lượng không được để trống' })
    @IsNumber({}, { message: 'Trọng lượng phải là số' })
    weight: number;

    @IsNotEmpty({ message: 'Model không được để trống' })
    @IsString({ message: 'Model phải là một chuỗi' })
    model: string;

    @IsNotEmpty({ message: 'Dung lượng pin không được để trống' })
    @IsString({ message: 'Dung lượng pin phải là một chuỗi' })
    battery_capacity: string;

    @IsOptional()
    @IsString({ message: 'Range (km) phải là một chuỗi' })
    range_km?: string;

    @IsOptional()
    @IsString({ message: 'Giá không có pin phải là một chuỗi' })
    price_no_battery?: string;

    @IsOptional()
    @IsString({ message: 'Giá có pin phải là một chuỗi' })
    price_has_battery?: string;

    @IsOptional()
    @IsString({ message: 'Trạng thái phải là một chuỗi' })
    status?: string;

    @IsOptional()
    @IsString({ message: 'Display phải là một chuỗi' })
    display?: string;

    @IsOptional()
    @IsString({ message: 'Điều hòa phải là một chuỗi' })
    conditioning?: string;

    @IsOptional()
    @IsString({ message: 'Âm thanh phải là một chuỗi' })
    sound?: string;

    @IsOptional()
    @IsString({ message: 'USB phải là một chuỗi' })
    usb?: string;

    @IsOptional()
    @IsString({ message: 'Bluetooth phải là một chuỗi' })
    bluetooth?: string;

    @IsOptional()
    @IsString({ message: 'Gương chắn nắng phải là một chuỗi' })
    sun_visor?: string;

    @IsOptional()
    @IsString({ message: 'Đèn phải là một chuỗi' })
    lights?: string;

    @IsOptional()
    @IsString({ message: 'Phanh phải là một chuỗi' })
    brake?: string;

    @IsOptional()
    @IsString({ message: 'Phanh ABS phải là một chuỗi' })
    brake_abs?: string;

    @IsOptional()
    @IsString({ message: 'EBD phải là một chuỗi' })
    ebd?: string;

    @IsOptional()
    @IsString({ message: 'ESC phải là một chuỗi' })
    esc?: string;

    @IsOptional()
    @IsString({ message: 'TCS phải là một chuỗi' })
    tcs?: string;

    @IsOptional()
    @IsString({ message: 'HSA phải là một chuỗi' })
    hsa?: string;

    @IsOptional()
    @IsString({ message: 'ROM phải là một chuỗi' })
    rom?: string;

    @IsOptional()
    @IsString({ message: 'Air Bag phải là một chuỗi' })
    air_bag?: string;

    @IsOptional()
    @IsString({ message: 'Key Code phải là một chuỗi' })
    key_code?: string;

    @IsOptional()
    @IsBoolean()
    is_active: boolean;

    car_features: [
        {
            image_url: string;
            color: string;
            is_active?: boolean;
        },
    ];
}
