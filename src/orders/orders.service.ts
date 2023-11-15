import { Injectable } from '@nestjs/common';
import { EnumOrderStatus, OrderItem } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class OrdersService {
    constructor(private prisma: PrismaService){}

    async createOrder(userId: number, dto: OrderItem[]){
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
