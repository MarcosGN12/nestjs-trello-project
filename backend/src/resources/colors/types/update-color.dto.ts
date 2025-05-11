import { IsString, IsOptional } from 'class-validator';

export class UpdateColorDto {
    @IsOptional()
    @IsString()
    name?: string;

    @IsOptional()
    @IsString()
    value?: string;
}