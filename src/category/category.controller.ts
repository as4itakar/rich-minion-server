import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { CategoryService } from './category.service';
import { ChangeCategoryDto, CreateCategoryDto } from './dto/category.dto';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  createCategory(@Body() productDto: CreateCategoryDto){
    return this.categoryService.create(productDto)
  }

  @Put('/:id')
  changeCategory(@Param('id') categoryId, @Body() productDto: ChangeCategoryDto){
    return this.categoryService.change(categoryId, productDto)
  }

  @Get('/:id')
  getCategory(@Param('id') id: number){
    return this.categoryService.getById(id)
  }

  @Get()
  getCategories(){
    return this.categoryService.getAll()
  }
}
