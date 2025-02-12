import { IsBoolean, IsNumber } from 'class-validator';

export class VisibleDTO {
    @IsNumber()
    id: number;

    @IsBoolean()
    is_active: boolean;
}
