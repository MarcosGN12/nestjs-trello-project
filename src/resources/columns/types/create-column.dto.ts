import { IsString, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateColumnDto {

    @IsString()
    @IsNotEmpty()
    name: string;

    @IsNumber()
    userId: number;
}