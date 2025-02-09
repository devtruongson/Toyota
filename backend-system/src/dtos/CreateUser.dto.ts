import { IsEmail, IsNotEmpty, IsNumber, IsNumberString, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
    constructor() {}

    @IsNotEmpty()
    first_name: string;

    @IsNotEmpty()
    last_name: string;

    @IsNotEmpty()
    @IsNumber()
    address: string;

    @IsNotEmpty()
    @IsString()
    address_detail: string;

    @IsNotEmpty()
    @IsNumberString()
    phone_number: string;

    @IsNotEmpty()
    @IsString()
    code: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(8)
    password: string;
}
