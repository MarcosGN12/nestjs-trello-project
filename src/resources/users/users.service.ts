import { ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import { CreateUserDto } from "./types/create-user.dto";
import { UpdateUserDto } from "./types/update-user.dto";
import { PrismaService } from "src/config/prisma.service";
import { User } from "./types/user.type";

@Injectable()
export class UsersService {
    constructor(private db: PrismaService) { }

    getAllUsers(): Promise<User[]> {
        return this.db.users.findMany();
    }

    async getUser(id: number): Promise<User> {
        const user = await this.db.users.findUnique({
            where: { id: id }
        });

        if (!user) {
            throw new NotFoundException('User not found');
        }

        return user;
    }

    async createUser(user: CreateUserDto): Promise<User> {
        const duplicatedUser = await this.isUserEmailDuplicated(user.email)

        if (duplicatedUser) {
            throw new ConflictException("User email already in use")
        }

        // simplifica la contraseña con spread operator para esconder informacion sensible
        const { password, ...userWithoutPass } = await this.db.users.create({
            data: {
                name: user.name,
                email: user.email,
                password: user.password,
            },
        });


        return userWithoutPass;
    }

    async updateUser(id: number, user: UpdateUserDto): Promise<User> {
        const userToUpdate = await this.existsUser(id);

        if (!userToUpdate) {
            throw new NotFoundException('User not found');
        }

        const updatedUser = await this.db.users.update({
            where: { id: id },
            data: user
        })

        return updatedUser;
    }

    async deleteUser(id: number): Promise<User> {
        const userToDelete = await this.existsUser(id);

        if (!userToDelete) {
            throw new NotFoundException('User not found');
        }

        const deletedUser = await this.db.users.delete({
            where: { id: id }
        });

        return deletedUser;
    }

    private async existsUser(id: number): Promise<User | null> {
        return this.db.users.findUnique({ where: { id: id } });
    }

    private async isUserEmailDuplicated(email: string): Promise<User | null> {
        return this.db.users.findUnique({ where: { email: email } });
    }
}