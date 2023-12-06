import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { OrderDto } from './dto/order.dto';
import { returnOrder } from './dto/return-orders.object';

@Injectable()
export class OrdersService {
    constructor(private prisma: PrismaService){}

    async createOrder(dto: OrderDto, userId: number){

        await this.prisma.order.create({
            data: {
                status: dto.status,
                items: {
                    create: dto.items
                },
                user: {
                    connect: {
                        id: userId
                    }
                }
            }
        })

        return {message: 'Заказ успешно создан'}
    }

    async getByUserId(userId: number){
        const order = await this.prisma.order.findMany({
            where: {
                user: {
                    id: userId
                }
            },
            select: returnOrder
        })

        return order
    }
}
