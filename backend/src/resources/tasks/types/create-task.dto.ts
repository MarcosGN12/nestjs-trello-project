import { IsString, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateTaskDto {

    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    description: string;

    @IsNumber()
    userId: number;

    @IsNumber()
    columnId: number;

    @IsNumber()
    categoryId: number;
}