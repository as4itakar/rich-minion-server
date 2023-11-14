import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { PrismaService } from './prisma.service';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { ProfileModule } from './profile/profile.module';
import { CategoryModule } from './category/category.module';
import { ReviewsModule } from './reviews/reviews.module';

@Module({
  imports: [
    AuthModule, 
    UsersModule,
    ConfigModule.forRoot(),
    ProfileModule,
    CategoryModule,
    ReviewsModule,
  ],
  providers: [PrismaService]
})
export class AppModule {}
