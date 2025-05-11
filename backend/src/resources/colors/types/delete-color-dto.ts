import { IsString } from 'class-validator';

export class DeleteColor {
    @IsString()
    name?: string;

    @IsString()
    value?: string;
}