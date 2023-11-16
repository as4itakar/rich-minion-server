import { Body, Controller, Get, Param, Post, Put, Query, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { ProductsService } from './products.service';
import { GetAllProductDto } from './dto/get-all-products.dto';
import { ProductDto } from './dto/product.dto';
import { Roles } from 'src/auth/guards/roles-auth.decorator';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { RoleValuesEnum } from 'src/roles/dto/role.dto';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @UsePipes(new ValidationPipe())
  @Get()
  getAll(@Query() queryDto: GetAllProductDto){
    return this.productsService.getAll(queryDto)
  }

  @Get('/:id')
  getById(@Param('id') id: number){
    return this.productsService.getById(id)
  }

  @Get('/:categoryId')
  getByCategory(@Param('categoryId') categoryId: number){
    return this.productsService.getByCategory(categoryId)
  }

  @Get('/:id')
  getSimuluar(@Param('id') id: number){
    return this.productsService.getSimular(id)
  }

  @Roles(RoleValuesEnum.OWNER)
  @UseGuards(RolesGuard)
  @UsePipes(new ValidationPipe())
  @Post()
  createProduct(@Body() productDto: ProductDto){
    return this.productsService.create(productDto)
  }

  @Roles(RoleValuesEnum.OWNER)
  @UseGuards(RolesGuard)
  @UsePipes(new ValidationPipe())
  @Put('/:id')
  updateProduct(@Param('id') id: number, @Body() productDto: ProductDto){
    return this.productsService.update(id, productDto)
  }
}
