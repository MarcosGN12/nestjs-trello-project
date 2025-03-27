import { Module } from '@nestjs/common';
import { ColumnsController } from './columns.controller';
import { ColumnsService } from './columns.service';
import { PrismaService } from 'src/config/prisma.service';

@Module({
    controllers: [ColumnsController],
    providers: [ColumnsService, PrismaService],
    exports: [ColumnsService],
})
export class ColumnsModule { }
