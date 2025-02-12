import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class CreateCateDTO {
    @IsNotEmpty()
    @IsString()
    title: string;

    @IsBoolean()
    is_active: boolean;
}
