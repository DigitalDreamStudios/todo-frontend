import { IsString, IsBoolean, IsNotEmpty } from 'class-validator';

export class CreateTodoDto {
    @IsString() @IsNotEmpty()
    description: string;
    @IsBoolean()
    status: boolean;
}