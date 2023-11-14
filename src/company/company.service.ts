import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CompanyDto } from './dto/company.dto';

@Injectable()
export class CompanyService {
    constructor(private prisma: PrismaService){}

    async create(userId: number, dto: CompanyDto){
        const company = await this.prisma.company.create({
            data: {
                ...dto,
                user: {
                    connect: {
                        id: userId
                    }
                }
            }
        })

        return company
    }

    async getByUserId(userId: number){
        const company = await this.prisma.company.findUnique({
            where: {
                userId
            }
        })

        if (!company) throw new BadRequestException('Такая компания не найдена...')

        return company
    }

    async change(userId: number, dto: CompanyDto){
        await this.getByUserId(userId)

        const company = await this.prisma.company.update({
            where: {
                userId
            },
            data: {
                ...dto
            }
        })

        return company
    }
}
