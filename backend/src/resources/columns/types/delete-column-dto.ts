import { IsString } from 'class-validator';

export class DeleteColumn {
    @IsString()
    name?: string;
}