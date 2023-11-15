import { Controller, Get, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { ProductsService } from './products.service';
import { GetAllProductDto } from './dto/get-all-products.dto';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @UsePipes(new ValidationPipe())
  @Get()
  getAll(@Query() queryDto: GetAllProductDto){
    return this.productsService.getAll(queryDto)
  }
  
}
