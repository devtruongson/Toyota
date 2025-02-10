import { IsEmail, IsString } from 'class-validator';

export class SendEmailToClientDTO {
    @IsEmail()
    email: string;

    @IsString()
    html: string;
}
