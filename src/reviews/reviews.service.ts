import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { ReviewDto } from './dto/review.dto';
import { returnReview } from './dto/return-review.object';

@Injectable()
export class ReviewsService {
    constructor(private prisma: PrismaService){}

    async get(id: number){
        const review = await this.prisma.review.findUnique({
            where: {
                id
            },
            select: returnReview
        })

        if (!review) throw new BadRequestException('Пользователь не найден...')

        return review
    }

    async create(userId: number, dto: ReviewDto){

        const {rating, text} = dto

        const review = this.prisma.review.create({
            data:{
                rating,
                text,
                product: {
                    connect: {
                        id: dto.productId
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
            },
            select: returnReview
        })

        const averageRate = await this.prisma.review.aggregate({
            where: { productId},
            _avg: { rating: true }
        })

        return {reviews, rate: averageRate}
    }

    async getAverageValue(productId: number){
        return await this.prisma.review.aggregate({
            where: { productId },
            _avg: { rating: true }
        })
    }
}
