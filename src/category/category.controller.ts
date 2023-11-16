import { Body, Controller, Get, Param, Post, Put, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryDto } from './dto/category.dto';
import { Roles } from 'src/auth/guards/roles-auth.decorator';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { RoleValuesEnum } from 'src/roles/dto/role.dto';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Roles(RoleValuesEnum.ADMIN)
  @UseGuards(RolesGuard)
  @UsePipes(new ValidationPipe())
  @Post()
  createCategory(@Body() productDto: CategoryDto){
    return this.categoryService.create(productDto)
  }

  @Roles(RoleValuesEnum.ADMIN)
  @UseGuards(RolesGuard)
  @UsePipes(new ValidationPipe())
  @Put('/:id')
  changeCategory(@Param('id') categoryId, @Body() productDto: CategoryDto){
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
