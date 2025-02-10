import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class RegisterFormDTO {
    @IsNumber()
    user_id: number;

    @IsNumber()
    car_id: number;

    @IsString()
    note: string;

    @IsNotEmpty()
    @IsNumber()
    time: number;
}
