import { Controller, Get, Post, Put, Delete, Param, Body, UseGuards } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from "./types/create-task.dto";
import { UpdateTaskDto } from "./types/update-task.dto";
import { Task } from './types/task.type';
import { AuthGuard } from 'src/auth/guard/auth.guard';
import { GetUserId } from 'src/decorators/get-user-id.decorator';

@Controller('/tasks')
export class TasksController {
    constructor(private tasksService: TasksService) { }

    @Get()
    @UseGuards(AuthGuard)
    getAllTasks(@GetUserId() userId: number): Promise<Task[]> {
        return this.tasksService.getAllTasks(userId);
    }

    @Get('/:id')
    @UseGuards(AuthGuard)
    getTask(@Param('id') id: string, @GetUserId() userId: number): Promise<Task> {
        return this.tasksService.getTask(parseInt(id), userId);
    }

    @Post()
    @UseGuards(AuthGuard)
    createTask(@GetUserId() userId: number, @Body() task: CreateTaskDto): Promise<Task> {
        task.userId = userId;
        return this.tasksService.createTask(task, userId);
    }

    @Put('/:id')
    @UseGuards(AuthGuard)
    updateTask(@Param('id') id: string, @Body() task: UpdateTaskDto, @GetUserId() userId: number): Promise<Task> {
        return this.tasksService.updateTask(parseInt(id), task, userId);
    }

    @Delete('/:id')
    @UseGuards(AuthGuard)
    deleteTask(@Param('id') id: string, @GetUserId() userId: number): Promise<Task> {
        return this.tasksService.deleteTask(parseInt(id), userId);
    }
}
