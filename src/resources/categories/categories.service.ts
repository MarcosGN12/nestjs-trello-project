import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "src/config/prisma.service";
import { Category } from "./types/categories.type";
import { CreateCategoryDto } from "./types/create-category.dto";
import { UpdateCategoryDto } from "./types/update-category.dto";

@Injectable()
export class CategoriesService {
    constructor(private db: PrismaService) { }

    getAllCategories(): Promise<Category[]> {
        return this.db.categories.findMany();
    }

    async getCategory(id: number): Promise<Category> {
        const category = await this.db.categories.findUnique({
            where: { id: id }
        })

        if (!category) {
            throw new NotFoundException('Category not found');
        }

        return category;
    }

    async createCategory(category: CreateCategoryDto): Promise<Category> {
        const createdCategory = await this.db.categories.create({
            data: {
                name: category.name,
                colorId: category.colorId
            },
        });

        return createdCategory;
    }

    async updateCategory(id: number, category: UpdateCategoryDto): Promise<Category> {
        const updateCategory = await this.db.categories.update({
            where: { id: id },
            data: category
        })

        return updateCategory;
    }

    async deleteCategory(id: number): Promise<Category> {
        const categoryToDelete = await this.existsCategory(id);

        if (!categoryToDelete) {
            throw new NotFoundException('Category not found');
        }

        const deletedCategory = await this.db.categories.delete({
            where: { id: id }
        })

        return deletedCategory;
    }

    private async existsCategory(id: number): Promise<Category | null> {
        return this.db.categories.findUnique({ where: { id: id } });
    }
}