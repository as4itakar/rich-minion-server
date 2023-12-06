import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { PrismaService } from '../prisma.service';
import { FileModule } from '../file/file.module';

@Module({
  controllers: [CategoryController],
  providers: [CategoryService, PrismaService],
  imports: [FileModule]
})
export class CategoryModule {}
