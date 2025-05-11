import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { CategoriesService } from "./categories.service";
import { Category } from "./types/categories.type";
import { CreateCategoryDto } from "./types/create-category.dto";
import { UpdateCategoryDto } from "./types/update-category.dto";

@Controller('/categories')
export class CategoriesController {
    constructor(private categoriesService: CategoriesService) { }

    @Get()
    getAllCategories(): Promise<Category[]> {
        return this.categoriesService.getAllCategories();
    }

    @Get('/:id')
    getCategory(@Param('id') id: string): Promise<Category> {
        return this.categoriesService.getCategory(parseInt(id));
    }

    @Post()
    createCategory(@Body() category: CreateCategoryDto): Promise<Category> {
        return this.categoriesService.createCategory(category);
    }

    @Put('/:id')
    updateCategory(@Param('id') id: string, @Body() category: UpdateCategoryDto): Promise<Category> {
        return this.categoriesService.updateCategory(parseInt(id), category);
    }

    @Delete('/:id')
    deleteCategory(@Param('id') id: string): Promise<Category> {
        return this.categoriesService.deleteCategory(parseInt(id));
    }
}