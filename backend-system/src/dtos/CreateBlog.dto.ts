import { IsBoolean, IsNumber, IsString } from 'class-validator';

export class CreateBlogDTO {
    @IsString()
    thumbnail: string;

    @IsString()
    title: string;

    @IsString()
    meta_description: string;

    @IsString()
    content: string;

    @IsBoolean()
    is_active?: boolean;

    @IsNumber()
    cate_id: number;
}
