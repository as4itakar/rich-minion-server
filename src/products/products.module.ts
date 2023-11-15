import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { PaginationModule } from 'src/pagination/pagination.module';

@Module({
  controllers: [ProductsController],
  providers: [ProductsService],
  imports: [PaginationModule]
})
export class ProductsModule {}
