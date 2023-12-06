import { Module } from '@nestjs/common';
import { CompanyService } from './company.service';
import { CompanyController } from './company.controller';
import { PrismaService } from '../prisma.service';
import { UsersModule } from '../users/users.module';
import { FileModule } from '../file/file.module';

@Module({
  controllers: [CompanyController],
  providers: [CompanyService, PrismaService],
  imports: [UsersModule, FileModule],
  exports: [CompanyService]
})
export class CompanyModule {}
