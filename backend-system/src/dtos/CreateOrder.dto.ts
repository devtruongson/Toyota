import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateOrderDTO {
    @IsNumber()
    user_id: number;

    @IsNumber()
    car_id: number;

    @IsString()
    order_date: Date;

    @IsString()
    title: string;

    @IsString()
    meta_sub_title: string;

    @IsString()
    is_show_form: string;

    @IsString()
    description: string;

    @IsNumber()
    weight: number;

    @IsString()
    model: string;

    @IsString()
    battery_capacity: string;

    @IsOptional()
    @IsString()
    range_km?: string;

    @IsOptional()
    @IsString()
    price_no_battery?: string;

    @IsOptional()
    @IsString()
    price_has_battery?: string;

    @IsOptional()
    @IsString()
    display?: string;

    @IsOptional()
    @IsString()
    conditioning?: string;

    @IsOptional()
    @IsString()
    sound?: string;

    @IsOptional()
    @IsString()
    usb?: string;

    @IsOptional()
    @IsString()
    bluetooth?: string;

    @IsOptional()
    @IsString()
    sun_visor?: string;

    @IsOptional()
    @IsString()
    lights?: string;

    @IsOptional()
    @IsString()
    brake?: string;

    @IsOptional()
    @IsString()
    brake_abs?: string;

    @IsOptional()
    @IsString()
    ebd?: string;

    @IsOptional()
    @IsString()
    esc?: string;

    @IsOptional()
    @IsString()
    tcs?: string;

    @IsOptional()
    @IsString()
    hsa?: string;

    @IsOptional()
    @IsString()
    rom?: string;

    @IsOptional()
    @IsString()
    air_bag?: string;

    @IsOptional()
    @IsString()
    key_code?: string;

    // Nếu không có dữ liệu từ client, các giá trị mặc định có thể được áp dụng từ phía DB
    @IsString()
    note: string;

    @IsString()
    status: string;
}
