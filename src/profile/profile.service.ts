import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { ProfileDto } from './dto/profile.dto';

@Injectable()
export class ProfileService {
    constructor(private prisma: PrismaService){}

    async create(name: string, userId: number){
        await this.prisma.profile.create({
            data: {
                name,
                user: {
                    connect: {
                        id: userId
                    }
                }
            }
        })
    }

    async get(userId: number){
        const profile = await this.prisma.profile.findUnique({
            where: {
                userId
            },
            include: {
                favorites: true
            }
        })

        if (!profile) throw new BadRequestException('Пользователь не найден...')

        return profile
    }

    async change(userId: number, dto: ProfileDto){
        await this.get(userId)

        return this.prisma.profile.update({
            where: {
                userId
            },
            data: {
                ...dto
            }
        })
    }

    async toggleFavorite(userId: number, productId:number){
        const profile = await this.get(userId)

        const isExist = profile.favorites.some(product => product.productId === productId)

        await this.prisma.profile.update({
            where: {
                userId
            },
            data: {
                favorites: {
                    [isExist ? 'disconnect': 'connect']: {
                        id: productId
                    }
                }
            }
        })

        return {message: "Удача"}
    }
}
