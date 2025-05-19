import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from "./types/create-task.dto";
import { UpdateTaskDto } from "./types/update-task.dto";
import { PrismaService } from '../../config/prisma.service';
import { Task } from './types/task.type';
import { User } from '../users/types/user.type';

@Injectable()
export class TasksService {
    constructor(private db: PrismaService) { }

    getAllTasks(userId: number): Promise<Task[]> {
        const userTasks = this.db.tasks.findMany({
            where: {
                userId: userId
            }
        })
        return userTasks;
    }

    async getTask(id: number, userId: number): Promise<Task> {
        const task = await this.db.tasks.findUnique({
            where: {
                id: id,
                userId: userId
            }
        });

        if (!task) {
            throw new NotFoundException('Task not found or access denied');
        }

        return task;
    }

    async createTask(task: CreateTaskDto, userId: number): Promise<Task> {
        // Verifica si el nombre de la tarea ya existe
        const taskNameExists = await this.db.tasks.findUnique({
            where: {
                name: task.name,
            },
        });

        if (taskNameExists) {
            throw new NotFoundException('Task name already exists');
        }

        // Verifica si la columna existe y pertenece al usuario
        const foundColumn = await this.db.columns.findUnique({
            where: {
                id: task.columnId,
                userId: userId,
            },
        });

        if (!foundColumn) {
            throw new NotFoundException('Column not found or access denied');
        }

        if (!task.categoryId) {
            throw new BadRequestException('Category ID is required');
        }

        // Verifica si la categoría existe
        const foundCategory = await this.db.categories.findUnique({
            where: {
                id: task.categoryId,
            },
        });

        if (!foundCategory) {
            throw new NotFoundException('Category not found');
        }

        // Crea la tarea
        const createdTask = await this.db.tasks.create({
            data: {
                name: task.name,
                description: task.description,
                createdAt: new Date(),
                userId: userId,
                columnId: task.columnId,
                categoryId: task.categoryId,
            },
        });

        return createdTask;
    }

    async updateTask(id: number, task: UpdateTaskDto, userId: number): Promise<Task> {
        const taskToUpdate = await this.existsTask(id, userId);

        if (!taskToUpdate) {
            throw new NotFoundException('Task not found or access denied');
        }

        console.log({ task })

        const updatedTask = await this.db.tasks.update({
            where: {
                id: id,
                userId: userId
            },
            data: task
        });

        return updatedTask;
    }

    async deleteTask(id: number, userId: number): Promise<Task> {
        const taskToDelete = await this.existsTask(id, userId);

        if (!taskToDelete) {
            throw new NotFoundException('Task not found or access denied');
        }

        const deletedTask = await this.db.tasks.delete({
            where: {
                id: id,
                userId: userId
            }
        });

        return deletedTask;
    }

    private async existsTask(id: number, userId: number): Promise<Task | null> {
        return this.db.tasks.findUnique({
            where: {
                id: id,
                userId: userId
            }
        });
    }

    private async existsUser(id: number): Promise<User | null> {
        return this.db.users.findUnique({ where: { id: id } });
    }
}

