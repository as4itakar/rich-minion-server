import { Module } from '@nestjs/common';
import { CompanyService } from './company.service';
import { CompanyController } from './company.controller';
import { PrismaService } from 'src/prisma.service';
import { UsersModule } from 'src/users/users.module';
import { FileModule } from 'src/file/file.module';

@Module({
  controllers: [CompanyController],
  providers: [CompanyService, PrismaService],
  imports: [UsersModule, FileModule],
  exports: [CompanyService]
})
export class CompanyModule {}
