import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/resources/users/users.service';
import { RegisterDto } from './dto/register.dto';
import * as bcryptjs from 'bcrypt';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService
    ) { }

    async register({ name, email, password }: RegisterDto) {
        const user = await this.usersService.findOneByEmail(email);

        if (user) {
            throw new ConflictException('User already exists');
        }

        await this.usersService.createUser({
            name,
            email,
            password: await bcryptjs.hash(password, 10),
        });

        return {
            name,
            email,
        };
    }

    async login({ email, password }: LoginDto) {
        const user = await this.usersService.findOneByEmail(email);

        if (!user) {
            throw new UnauthorizedException('email is wrong');
        }

        const isPasswordValid = await bcryptjs.compare(password, user.password);

        if (!isPasswordValid) {
            throw new UnauthorizedException('password is wrong');
        }

        const payload = { userId: user.id, role: user.role };
        const token = await this.jwtService.signAsync(payload);

        return {
            token,
        };
    }
}
