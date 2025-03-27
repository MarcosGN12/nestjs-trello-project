import { Module } from '@nestjs/common';
import { PrismaService } from 'src/config/prisma.service';
import { ColorsService } from './colors.service';
import { ColorsController } from './colors.controller';

@Module({
  controllers: [ColorsController],
  providers: [ColorsService, PrismaService],
  exports: [ColorsService],
})
export class ColorsModule { }
