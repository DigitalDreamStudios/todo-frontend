import { IsString, IsNotEmpty, IsEmail } from 'class-validator';

export class CreateLoginDto {
    @IsEmail() @IsNotEmpty()
    email: string;
    @IsString() @IsNotEmpty()
    password: string;
}