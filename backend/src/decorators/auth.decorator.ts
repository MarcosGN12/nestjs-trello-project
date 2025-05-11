import { applyDecorators, UseGuards } from '@nestjs/common';
import { Role } from "src/auth/enums/rol.enum";
import { Roles } from './roles.decorator';
import { AuthGuard } from 'src/auth/guard/auth.guard';
import { RolesGuard } from 'src/auth/guard/roles.guard';

export function Auth(role: Role) {
    return applyDecorators(Roles(role), UseGuards(AuthGuard, RolesGuard));
}