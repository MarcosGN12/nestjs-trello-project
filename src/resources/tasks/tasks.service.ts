import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from "./types/create-task.dto";
import { UpdateTaskDto } from "./types/update-task.dto";
import { PrismaService } from '../../config/prisma.service';
import { Task } from './types/task.type';
import { User } from '../users/types/user.type';

@Injectable()
export class TasksService {
    constructor(private db: PrismaService) { }

    getAllTasks(): Promise<Task[]> {
        return this.db.tasks.findMany();
    }

    async getTask(id: number): Promise<Task> {
        const task = await this.db.tasks.findUnique({
            where: { id: id }
        });

        if (!task) {
            throw new NotFoundException('Task not found');
        }

        return task;
    }

    async createTask(task: CreateTaskDto): Promise<Task> {
        const foundUser = await this.existsUser(task.userId);

        if (!foundUser) {
            throw new NotFoundException('User not found')
        }

        const createdTask = await this.db.tasks.create({
            data: {
                name: task.name,
                description: task.description,
                createdAt: new Date(),
                userId: task.userId,
                columnId: task.columnId,
                categoryId: task.categoryId
            },
        });

        return createdTask;
    }

    async updateTask(id: number, task: UpdateTaskDto): Promise<Task> {
        const taskToUpdate = await this.existsTask(id);

        if (!taskToUpdate) {
            throw new NotFoundException('Task not found');
        }

        const updatedTask = await this.db.tasks.update({
            where: { id: id },
            data: task
        });

        return updatedTask;
    }

    async deleteTask(id: number): Promise<Task> {
        const taskToDelete = await this.existsTask(id);

        if (!taskToDelete) {
            throw new NotFoundException('Task not found');
        }

        const deletedTask = await this.db.tasks.delete({
            where: { id: id }
        });

        return deletedTask;
    }

    private async existsTask(id: number): Promise<Task | null> {
        return this.db.tasks.findUnique({ where: { id: id } });
    }

    private async existsUser(id: number): Promise<User | null> {
        return this.db.users.findUnique({ where: { id: id } });
    }
}

