import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { PaginationModule } from 'src/pagination/pagination.module';
import { PrismaService } from 'src/prisma.service';
import { FileModule } from 'src/file/file.module';
import { CompanyModule } from 'src/company/company.module';

@Module({
  controllers: [ProductsController],
  providers: [ProductsService, PrismaService],
  imports: [PaginationModule, FileModule, CompanyModule]
})
export class ProductsModule {}
