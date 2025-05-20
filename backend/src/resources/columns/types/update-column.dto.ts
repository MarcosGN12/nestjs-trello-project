import { IsString, IsOptional, IsArray } from 'class-validator';

export class UpdateColumnDto {
    @IsOptional()
    @IsString()
    name?: string;

    @IsOptional()
    @IsArray()
    taskOrder?: number[]
}