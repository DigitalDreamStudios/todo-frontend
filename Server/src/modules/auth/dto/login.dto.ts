import { IsString, IsNotEmpty } from 'class-validator';

export class CreateLoginDto {
    @IsString() @IsNotEmpty()
    email: string;
    @IsString() @IsNotEmpty()
    password: string;
}