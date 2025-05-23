import { IsString, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateColorDto {

    @IsString()
    @IsNotEmpty()
    name: string;

    @IsNumber()
    value: string;
}