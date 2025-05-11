import { IsString } from 'class-validator';

export class DeleteCategory {
    @IsString()
    name?: string;
}