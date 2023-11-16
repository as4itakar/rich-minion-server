import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CategoryDto } from './dto/category.dto';

@Injectable()
export class CategoryService {
    constructor(private prisma: PrismaService){}

    async getById(id: number){
        const category = await this.prisma.category.findUnique({
            where: {
                id
            }
        })

        if (!category) throw new BadRequestException('Такой категории не существует...')

        return category
    }

    async getAll(){
        const categories = await this.prisma.category.findMany()

        if (!categories) throw new BadRequestException('Ни одной категории не найдено...')

        return categories
    }

    async create(dto: CategoryDto){
        const category = await this.prisma.category.create({
            data: {
                ...dto
            }
        })
    }

    async change(id: number, dto: CategoryDto){
        await this.getById(id)

        return await this.prisma.category.update({
            where: {
                id
            },
            data: {
                ...dto
            }
        })
    }
}
