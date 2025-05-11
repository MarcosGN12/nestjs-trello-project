import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { ColorsService } from "./colors.service";
import { Color } from "./types/color.type";
import { CreateColorDto } from "./types/create-color.dto";
import { UpdateColorDto } from "./types/update-color.dto";
import { Role } from "src/auth/enums/rol.enum";
import { Auth } from "src/decorators/auth.decorator";

@Controller('/colors')
export class ColorsController {
    constructor(private colorsService: ColorsService) { }

    @Get()
    getAllColors(): Promise<Color[]> {
        return this.colorsService.getAllColors();
    }

    @Get('/:id')
    getColor(@Param('id') id: string): Promise<Color> {
        return this.colorsService.getColor(parseInt(id));
    }

    @Post()
    @Auth(Role.ADMIN)
    createColor(@Body() color: CreateColorDto): Promise<Color> {
        return this.colorsService.createColor(color)
    }

    @Auth(Role.ADMIN)
    @Put('/:id')
    updateColor(@Param('id') id: string, @Body() color: UpdateColorDto): Promise<Color> {
        return this.colorsService.updateColor(parseInt(id), color);
    }

    @Delete('/:id')
    @Auth(Role.ADMIN)
    DeleteColor(@Param('id') id: string): Promise<Color> {
        return this.colorsService.deleteColor(parseInt(id))
    }
}