import { IsString, IsOptional, IsDateString } from 'class-validator';

export class DeleteTaskDto {
    @IsOptional()
    @IsString()
    name?: string;

    @IsOptional()
    @IsString()
    description?: string;

    @IsOptional()
    @IsDateString()
    createdAt?: string;

    @IsOptional()
    @IsDateString()
    endedAt?: string;
}