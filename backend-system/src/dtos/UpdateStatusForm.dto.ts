import { IsBoolean, IsNumber } from 'class-validator';

export class UpdateStatusFormDTO {
    @IsNumber()
    id_form: number;

    @IsBoolean()
    status: boolean;
}
