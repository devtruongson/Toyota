import { IsBoolean, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class UpdateCateDTO {
    @IsNumber()
    id: number;

    @IsNotEmpty()
    @IsString()
    title: string;

    @IsBoolean()
    is_active: boolean;
}
