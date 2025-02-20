import { IsEnum, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export enum RegisterType {
    TEST_DRIVE = 'TEST_DRIVE',
    BOOK_DEMO = 'BOOK_DEMO',
}

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

    @IsEnum(RegisterType)
    type: string;
}
