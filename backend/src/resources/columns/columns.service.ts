import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateColumnDto } from "./types/create-column.dto";
import { UpdateColumnDto } from "./types/update-column.dto";
import { PrismaService } from "src/config/prisma.service";
import { Column } from "./types/column.type";


@Injectable()
export class ColumnsService {
    constructor(private db: PrismaService) { }

    getAllColumns(userId: number): Promise<Column[]> {
        const userColumns = this.db.columns.findMany({
            where: {
                userId: userId
            },
            orderBy: { createdAt: "asc" }
        })
        return userColumns;
    }

    async getColumn(id: number, userId: number): Promise<Column> {
        const column = await this.db.columns.findUnique({
            where: {
                id: id,
                userId: userId
            },
        });

        if (!column) {
            throw new NotFoundException('Column not found or access denied');
        }

        return column;
    }

    async createColumn(column: CreateColumnDto, userId: number): Promise<Column> {
        const columnNameExists = await this.db.columns.findFirst({
            where: {
                name: column.name,
                userId: userId,
            },
        });

        if (columnNameExists) {
            throw new Error('Column name already exists');
        }

        const createdColumn = await this.db.columns.create({
            data: {
                name: column.name,
                userId: userId,
                taskOrder: []
            },
        });

        return createdColumn;
    }

    async updateColumn(id: number, column: UpdateColumnDto, userId: number): Promise<Column> {
        const columnToUpdate = await this.existsColumn(id, userId)

        if (!columnToUpdate) {
            throw new NotFoundException('Column not found or access denied');
        }

        const updatedColumn = await this.db.columns.update({
            where: {
                id: id,
                userId: userId
            },
            data: column,
        });

        return updatedColumn;
    }

    async deleteColumn(id: number, userId: number): Promise<Column> {
        const columnToDelete = await this.existsColumn(id, userId);

        if (!columnToDelete) {
            throw new NotFoundException('Column not found or access denied');
        }

        const deletedColumn = await this.db.columns.delete({
            where: {
                id: id,
                userId: userId,
            }
        })

        return deletedColumn;
    }

    private async existsColumn(id: number, userId: number): Promise<Column | null> {
        return this.db.columns.findUnique({
            where: {
                id: id,
                userId: userId
            }
        });
    }

}