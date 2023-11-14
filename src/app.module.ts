import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { PrismaService } from './prisma.service';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { ProfileModule } from './profile/profile.module';

@Module({
  imports: [
    AuthModule, 
    UsersModule,
    ConfigModule.forRoot(),
    ProfileModule,
  ],
  providers: [PrismaService]
})
export class AppModule {}
