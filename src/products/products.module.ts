import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { PaginationModule } from '../pagination/pagination.module';
import { PrismaService } from '../prisma.service';
import { FileModule } from '../file/file.module';
import { CompanyModule } from '../company/company.module';

@Module({
  controllers: [ProductsController],
  providers: [ProductsService, PrismaService],
  imports: [PaginationModule, FileModule, CompanyModule]
})
export class ProductsModule {}
