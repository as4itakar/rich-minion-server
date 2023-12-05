import { Body, Controller, Get, Param, Post, UploadedFile, UseInterceptors, UsePipes, ValidationPipe } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryDto } from './dto/category.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}


  @UsePipes(new ValidationPipe())
  @Post()
  @UseInterceptors(FileInterceptor('image'))
  createCategory(@Body() productDto: CategoryDto,
  @UploadedFile() image: Express.Multer.File
  ){
    return this.categoryService.create(productDto, image)
  }

  @Get('/:id')
  getCategory(@Param('id') id: string){
    return this.categoryService.getById(+id)
  }

  @Get()
  getCategories(){
    return this.categoryService.getAll()
  }
}
