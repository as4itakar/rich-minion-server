import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { OrderItemDto } from './dto/order.dto';

@Injectable()
export class OrdersService {
    constructor(private prisma: PrismaService){}

    async createOrder(userId: number, dto: OrderItemDto[]){
        const order = await this.prisma.order.create({
            data: {
                user: {
                    connect: {
                        id: userId
                    }
                },
                items: {
                    create: dto
                }
            },
            include: {
                items: true,
            }
        })

        return order
    }

    async getByUserId(userId: number){
        const order = await this.prisma.order.findMany({
            where: {
                user: {
                    id: userId
                }
            },
            include: {
                items: true
            }
        })
    }
}
