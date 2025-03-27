import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from "./types/create-task.dto";
import { UpdateTaskDto } from "./types/update-task.dto";
import { Task } from './types/task.type';

@Controller('/tasks')
export class TasksController {
    constructor(private tasksService: TasksService) { }

    @Get()
    getAllTasks(): Promise<Task[]> {
        return this.tasksService.getAllTasks();
    }

    @Get('/:id')
    getTask(@Param('id') id: string): Promise<Task> {
        return this.tasksService.getTask(parseInt(id));
    }

    @Post()
    createTask(@Body() task: CreateTaskDto): Promise<Task> {
        return this.tasksService.createTask(task);
    }

    @Put('/:id')
    updateTask(@Param('id') id: string, @Body() task: UpdateTaskDto): Promise<Task> {
        return this.tasksService.updateTask(parseInt(id), task);
    }

    @Delete('/:id')
    deleteTask(@Param('id') id: string): Promise<Task> {
        return this.tasksService.deleteTask(parseInt(id));
    }
}
