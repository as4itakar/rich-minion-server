import { Body, Controller, Get, Param, Post, Put, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { ProductsService } from './products.service';
import { GetAllProductDto } from './dto/get-all-products.dto';
import { ProductDto } from './dto/product.dto';

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

  @Post()
  createProduct(@Body() productDto: ProductDto){
    return this.productsService.create(productDto)
  }

  @Put('/:id')
  updateProduct(@Param('id') id: number, @Body() productDto: ProductDto){
    return this.productsService.update(id, productDto)
  }
}
