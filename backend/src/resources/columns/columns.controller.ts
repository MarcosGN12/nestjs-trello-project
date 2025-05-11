import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ColumnsService } from './columns.service';
import { Column } from './types/column.type';
import { CreateColumnDto } from './types/create-column.dto';
import { UpdateColumnDto } from './types/update-column.dto';
import { AuthGuard } from 'src/auth/guard/auth.guard';
import { GetUserId } from 'src/decorators/get-user-id.decorator';

@Controller('/columns')
export class ColumnsController {
    constructor(private columnsService: ColumnsService) { }

    @Get()
    @UseGuards(AuthGuard)
    getAllColumns(@GetUserId() userId: number): Promise<Column[]> {
        return this.columnsService.getAllColumns(userId);
    }

    @Get('/:id')
    @UseGuards(AuthGuard)
    getColumn(@Param('id') id: string, @GetUserId() userId: number): Promise<Column> {
        return this.columnsService.getColumn(parseInt(id), userId);
    }

    @Post()
    @UseGuards(AuthGuard)
    createColumn(@Body() column: CreateColumnDto, @GetUserId() userId: number): Promise<Column> {
        return this.columnsService.createColumn(column, userId);
    }

    @Put('/:id')
    @UseGuards(AuthGuard)
    updateColumn(@Param('id') id: string, @Body() column: UpdateColumnDto, @GetUserId() userId: number): Promise<Column> {
        return this.columnsService.updateColumn(parseInt(id), column, userId);
    }

    @Delete('/:id')
    @UseGuards(AuthGuard)
    deleteColumn(@Param('id') id: string, @GetUserId() userId: number): Promise<Column> {
        return this.columnsService.deleteColumn(parseInt(id), userId);
    }
}
