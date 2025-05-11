import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "src/config/prisma.service";
import { Color } from "./types/color.type";
import { CreateColorDto } from "./types/create-color.dto";
import { UpdateColorDto } from "./types/update-color.dto";

@Injectable()
export class ColorsService {
    constructor(private db: PrismaService) { }

    getAllColors(): Promise<Color[]> {
        return this.db.colors.findMany();
    }

    async getColor(id: number): Promise<Color> {
        const color = await this.db.colors.findUnique({
            where: { id: id }
        })

        if (!color) {
            throw new NotFoundException('Color')
        }

        return color;
    }

    async createColor(color: CreateColorDto): Promise<Color> {
        const createdColor = await this.db.colors.create({
            data: {
                name: color.name,
                value: color.value
            },
        });
        return createdColor;
    }

    async updateColor(id: number, color: UpdateColorDto): Promise<Color> {
        const updatedColor = await this.db.colors.update({
            where: { id: id },
            data: color
        })
        return updatedColor;
    }

    async deleteColor(id: number): Promise<Color> {
        const colorToDelete = await this.existsColor(id);

        if (!colorToDelete) {
            throw new NotFoundException('Color not found');
        }

        const deletedColor = await this.db.colors.delete({
            where: { id: id }
        })

        return deletedColor;
    }

    private async existsColor(id: number): Promise<Color | null> {
        return this.db.colors.findUnique({ where: { id: id } });
    }
}