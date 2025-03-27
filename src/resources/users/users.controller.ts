import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { UsersService } from "./users.service";
import { CreateUserDto } from "./types/create-user.dto";
import { UpdateUserDto } from "./types/update-user.dto";
import { User } from "./types/user.type"

@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService) { }

    @Get()
    getAllUsers(): Promise<User[]> {
        return this.usersService.getAllUsers();
    }

    @Get('/:id')
    getUser(@Param('id') id: string): Promise<User> {
        return this.usersService.getUser(parseInt(id));
    }

    @Post()
    createUser(@Body() user: CreateUserDto): Promise<User> {
        return this.usersService.createUser(user);
    }

    @Put('/:id')
    updateUser(@Param('id') id: string, @Body() user: UpdateUserDto): Promise<User> {
        return this.usersService.updateUser(parseInt(id), user);
    }

    @Delete('/:id')
    deleteUser(@Param('id') id: string): Promise<User> {
        return this.usersService.deleteUser(parseInt(id))
    }
}