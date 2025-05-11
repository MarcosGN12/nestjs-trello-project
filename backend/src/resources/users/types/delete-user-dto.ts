import { IsString } from 'class-validator';

export class DeleteUser {
    @IsString()
    name?: string;

    @IsString()
    email?: string;
}