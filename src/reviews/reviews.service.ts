import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { ReviewDto } from './dto/review.dto';

@Injectable()
export class ReviewsService {
    constructor(private prisma: PrismaService){}

    async get(id: number){
        const review = await this.prisma.review.findUnique({
            where: {
                id
            },
        })

        if (!review) throw new BadRequestException('Пользователь не найден...')

        return review
    }

    async create(userId: number, dto: ReviewDto, productId: number){
        const review = this.prisma.review.create({
            data:{
                ...dto,
                product: {
                    connect: {
                        id: productId
                    }
                },
                user: {
                    connect: {
                        id: userId
                    }
                }
            }
        })

        return review
    }

    async change(id: number, dto: ReviewDto){
        await this.get(id)

        return await this.prisma.review.update({
            where: {
                id
            },
            data: {
                ...dto
            }
        })
    }

    async getAll(productId: number){
        const reviews = await this.prisma.review.findMany({
            where: {
                productId
            }
        })
        return reviews
    }

    async getAverageValue(productId: number){
        return await this.prisma.review.aggregate({
            where: { productId },
            _avg: { rating: true }
        })
    }
}
