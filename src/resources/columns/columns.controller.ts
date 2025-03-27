import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ColumnsService } from './columns.service';
import { Column } from './types/column.type';
import { CreateColumnDto } from './types/create-column.dto';
import { UpdateColumnDto } from './types/update-column.dto';

@Controller('/columns')
export class ColumnsController {
    constructor(private columnsService: ColumnsService) { }

    @Get()
    getAllColumns(): Promise<Column[]> {
        return this.columnsService.getAllColumns();
    }

    @Get('/:id')
    getTask(@Param('id') id: string): Promise<Column> {
        return this.columnsService.getColumn(parseInt(id));
    }

    @Post()
    createTask(@Body() column: CreateColumnDto): Promise<Column> {
        return this.columnsService.createColumn(column);
    }

    @Put('/:id')
    updateTask(@Param('id') id: string, @Body() column: UpdateColumnDto): Promise<Column> {
        return this.columnsService.updateColumn(parseInt(id), column);
    }

    @Delete('/:id')
    deleteTask(@Param('id') id: string): Promise<Column> {
        return this.columnsService.deleteColumn(parseInt(id));
    }
}
