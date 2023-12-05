import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CategoryDto } from './dto/category.dto';
import { FileService } from 'src/file/file.service';
import { returnCategory } from './dto/return-category';

@Injectable()
export class CategoryService {
    constructor(private prisma: PrismaService,
        private fileService: FileService){}

    async getById(id: number){
        const category = await this.prisma.category.findUnique({
            where: {
                id
            },
            select: returnCategory
        })

        if (!category) throw new BadRequestException('Такой категории не существует...')

        return category
    }

    async getAll(){
        const categories = await this.prisma.category.findMany({
            select: returnCategory
        })

        if (!categories) throw new BadRequestException('Ни одной категории не найдено...')

        return categories
    }

    async create(dto: CategoryDto, image: Express.Multer.File){
        const filePath = await this.fileService.createFile(image)

        const category = await this.prisma.category.create({
            data: {
                ...dto,
                isOnBaner: Boolean(dto.isOnBaner),
                image: filePath,
            }
        })
        return category
    }

    async change(id: number, dto: CategoryDto, image: Express.Multer.File){
        const filePath = await this.fileService.createFile(image)

        await this.getById(id)

        return await this.prisma.category.update({
            where: {
                id
            },
            data: {
                ...dto,
                isOnBaner: Boolean(dto.isOnBaner),
                image: filePath
            }
        })
    }
}
