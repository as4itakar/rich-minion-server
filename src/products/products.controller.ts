import { Body, Controller, Get, Param, Post, Put, Query, UploadedFiles, UseGuards, UseInterceptors, UsePipes, ValidationPipe } from '@nestjs/common';
import { ProductsService } from './products.service';
import { GetAllProductDto } from './dto/get-all-products.dto';
import { ProductDto } from './dto/product.dto';
import { Roles } from '../auth/guards/roles-auth.decorator';
import { RolesGuard } from '../auth/guards/roles.guard';
import { RoleValuesEnum } from '../roles/dto/role.dto';
import { FilesInterceptor } from '@nestjs/platform-express';
import { CurrentUser } from '../auth/guards/user.decorator';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @UsePipes(new ValidationPipe())
  @Get()
  getAll(@Query() queryDto: GetAllProductDto){
    return this.productsService.getAll(queryDto)
  }

  @Get('one/:id')
  getById(@Param('id') id: string){
    return this.productsService.getById(+id)
  }

  @Get('category/:categoryId')
  getByCategory(@Param('categoryId') categoryId: string,
  @Query() queryDto: GetAllProductDto){
    return this.productsService.getByCategory(+categoryId, queryDto)
  }

  @Get('company/:companyId')
  getByCompany(@Param('companyId') companyId: string,
  @Query() queryDto: GetAllProductDto){
    return this.productsService.getByCompany(+companyId, queryDto)
  }

  @Get('/random')
  getRandom(){
    return this.productsService.getRandom()
  }

  @Roles(RoleValuesEnum.OWNER)
  @UseGuards(RolesGuard)
  @UsePipes(new ValidationPipe())
  @Post()
  @UseInterceptors(FilesInterceptor('images'))
  createProduct(@CurrentUser('id') id: string, @Body() productDto: ProductDto,
   @UploadedFiles() images: Array<Express.Multer.File>){
    return this.productsService.create(productDto, images, +id)
  }

  @Roles(RoleValuesEnum.OWNER)
  @UseGuards(RolesGuard)
  @UsePipes(new ValidationPipe())
  @Put('/:id')
  @UseInterceptors(FilesInterceptor('images'))
  updateProduct(@Param('id') id: string, @Body() productDto: ProductDto,
  @UploadedFiles() images: Array<Express.Multer.File>){
    return this.productsService.update(+id, productDto, images)
  }
}
