import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { PrismaService } from './prisma.service';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { ProfileModule } from './profile/profile.module';
import { CategoryModule } from './category/category.module';
import { ReviewsModule } from './reviews/reviews.module';
import { PaginationModule } from './pagination/pagination.module';
import { CompanyModule } from './company/company.module';
import { ProductsModule } from './products/products.module';
import { RolesModule } from './roles/roles.module';
import { OrdersModule } from './orders/orders.module';

@Module({
  imports: [
    AuthModule, 
    UsersModule,
    ConfigModule.forRoot(),
    ProfileModule,
    CategoryModule,
    ReviewsModule,
    PaginationModule,
    CompanyModule,
    ProductsModule,
    RolesModule,
    OrdersModule,
  ],
  providers: [PrismaService]
})
export class AppModule {}
