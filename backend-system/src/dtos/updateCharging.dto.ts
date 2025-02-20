import { IsNumber, IsString } from 'class-validator';

export class updateChargingDto {
    @IsNumber()
    id: number;

    @IsString()
    name: string;

    @IsString()
    location: string;

    @IsString()
    power_kw: string;
}
