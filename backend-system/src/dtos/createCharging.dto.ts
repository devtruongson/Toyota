import { IsString } from 'class-validator';

export class createChargingDto {
    @IsString()
    name: string;

    @IsString()
    location: string;

    @IsString()
    power_kw: string;
}
