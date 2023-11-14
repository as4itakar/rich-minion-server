import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class UsersService {
    
    constructor(private prisma: PrismaService){}

    async getUserByEmail(email: string){
        const user = await this.prisma.user.findUnique({
            where: {
                email
            }
        })

        if (user) throw new BadRequestException('Пользователь уже существует...')

        return user
    }

    async getUserById(id: number){
        const user = await this.prisma.user.findUnique({
            where: {
                id
            }
        })
        return user
    }
}
