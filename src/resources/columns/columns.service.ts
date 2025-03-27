import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateColumnDto } from "./types/create-column.dto";
import { UpdateColumnDto } from "./types/update-column.dto";
import { PrismaService } from "src/config/prisma.service";
import { Column } from "./types/column.type";


@Injectable()
export class ColumnsService {
    constructor(private db: PrismaService) { }

    getAllColumns(): Promise<Column[]> {
        return this.db.columns.findMany();
    }

    async getColumn(id: number): Promise<Column> {
        const column = await this.db.columns.findUnique({
            where: { id: id }
        })

        if (!column) {
            throw new NotFoundException('Column not found');
        }

        return column;
    }

    async createColumn(column: CreateColumnDto): Promise<Column> {
        const createdColumn = await this.db.columns.create({
            data: {
                name: column.name,
                userId: column.userId
            },
        });

        return createdColumn;
    }

    async updateColumn(id: number, column: UpdateColumnDto): Promise<Column> {
        const updatedColumn = await this.db.columns.update({
            where: { id: id },
            data: column
        })

        return updatedColumn;
    }

    async deleteColumn(id: number): Promise<Column> {
        const columnToDelete = await this.existsColumn(id);

        if (!columnToDelete) {
            throw new NotFoundException('Column not found');
        }

        const deletedColumn = await this.db.columns.delete({
            where: { id: id }
        })

        return deletedColumn;
    }

    private async existsColumn(id: number): Promise<Column | null> {
        return this.db.columns.findUnique({ where: { id: id } });
    }

}