import { Body, Controller, Delete, Get, Param, Post, UploadedFile, UseGuards, UseInterceptors, UsePipes, ValidationPipe } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryDto } from './dto/category.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { Roles } from 'src/auth/guards/roles-auth.decorator';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { RoleValuesEnum } from 'src/roles/dto/role.dto';

@Controller()
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Roles(RoleValuesEnum.OWNER)
  @UseGuards(RolesGuard)
  @UsePipes(new ValidationPipe())
  @Post('/category')
  @UseInterceptors(FileInterceptor('image'))
  createCategory(@Body() productDto: CategoryDto,
  @UploadedFile() image: Express.Multer.File
  ){
    return this.categoryService.create(productDto, image)
  }

  @Get('/category/:id')
  getCategory(@Param('id') id: string){
    return this.categoryService.getById(+id)
  }

  @Get('/category')
  getCategories(){
    return this.categoryService.getAll()
  }

  @Roles(RoleValuesEnum.OWNER)
  @UseGuards(RolesGuard)
  @Delete('/category/:id')
  delete(@Param('id') id: string){
    return this.categoryService.delete(+id)
  }
}
