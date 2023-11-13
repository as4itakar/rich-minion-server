import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { PrismaService } from './prisma.service';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    AuthModule, 
    UsersModule,
    ConfigModule.forRoot()
  ],
  providers: [PrismaService]
})
export class AppModule {}
