import { Injectable, NotFoundException } from '@nestjs/common';
import { PaginationService } from 'src/pagination/pagination.service';
import { PrismaService } from 'src/prisma.service';
import { EnumProductSort, GetAllProductDto } from './dto/get-all-products.dto';
import { Prisma } from '@prisma/client';
import { ProductDto } from './dto/product.dto';
import { returnProduct } from './dto/return-product';
import { FileService } from 'src/file/file.service';
import { CompanyService } from 'src/company/company.service';

@Injectable()
export class ProductsService {
    constructor(private prisma: PrismaService, 
        private paginationService: PaginationService,
        private fileService: FileService,
        private companyService: CompanyService){}

    async getAll(dto: GetAllProductDto = {}){
        const {prismaSort, prismaSearchTermFilter, perPage, skip} = this.queryCheck(dto)

        const products = await this.prisma.product.findMany({   
            where: prismaSearchTermFilter,
            orderBy: prismaSort,
            skip,
            take: perPage,
            select: returnProduct
        })

        const pages = await this.checkPages(prismaSearchTermFilter, perPage)

        return {products, length: pages}
    }

    async getById(id: number){
        const product = await this.prisma.product.findUnique({
            where: {
                id
            },
            select: returnProduct
        })

        if (!product) throw new NotFoundException('Продукт не найден...')

        return product
    }

    async getByCategory(categoryId: number, dto: GetAllProductDto = {}){
        const {prismaSort, prismaSearchTermFilter, perPage, skip} = this.queryCheck(dto)
        const termFilter = Object.assign(prismaSearchTermFilter, {category: {id: categoryId}})
        const products = await this.prisma.product.findMany({
            where: termFilter,
            orderBy: prismaSort,
            skip,
            take: perPage,
            select: returnProduct
        })

        if (!products) throw new NotFoundException('Продукт не найден...')

        const pages = await this.checkPages(prismaSearchTermFilter, perPage)

        return {products, length: pages}
    }

    async getByCompany(companyId: number, dto: GetAllProductDto = {}){
        const {prismaSort, prismaSearchTermFilter, perPage, skip} = this.queryCheck(dto)
        const termFilter = Object.assign({company: {id: companyId}}, prismaSearchTermFilter)
        
        const products = await this.prisma.product.findMany({
            where: termFilter,
            orderBy: prismaSort,
            skip,
            take: perPage,
            select: returnProduct
        })

        if (!products) throw new NotFoundException('Продукты не найден...')

        const pages = await this.checkPages(prismaSearchTermFilter, perPage)

        return {products, length: pages}
    }

    private queryCheck(dto: GetAllProductDto){
        const {sort, searchTerm} = dto

        const prismaSort = []

        if (sort === EnumProductSort.LOW_PRICE)
            prismaSort.push({price: 'asc'})
        else if (sort === EnumProductSort.HIGH_PRICE)
            prismaSort.push({price: 'desc'})
        else if (sort === EnumProductSort.OLDEST)
            prismaSort.push({createdAt: 'asc'})
        else
            prismaSort.push({createdAt: 'desc'})
        const prismaSearchTermFilter: Prisma.ProductWhereInput = searchTerm ? {
            OR: [
                {
                    category: {
                        name: {
                            contains: searchTerm,
                            mode: 'insensitive'
                        }
                    },
                },
                {
                    name: {
                        contains: searchTerm,
                        mode: 'insensitive'
                    },
                },
                {
                    description: {
                        contains: searchTerm,
                        mode: 'insensitive'
                    }
                } 
            ]
        } : {}

        const {perPage, skip} = this.paginationService.getPagination(dto)

        return {prismaSort, prismaSearchTermFilter, perPage, skip}
    }

    async getRandom(){
        const itemCount = await this.prisma.product.count()
        const count = 4
        const skip = Math.max(0, Math.floor(Math.random() * itemCount) - count)
        const products = await this.prisma.product.findMany({
            take: count,
            skip,
            select: returnProduct 
        })

        return products
    }

    async create(dto: ProductDto, images: Array<Express.Multer.File>, id: number){

        const filePaths = await this.fileService.createFilesArray(images)

        const company = await this.companyService.getByUserId(id)

        const {name, description, price, categoryId } = dto

        const product = await this.prisma.product.create({
            data: {
                name,
                description,
                price: JSON.parse(price),
                images: filePaths,
                company: {
                    connect: {
                        id: company.id
                    }
                },
                category: {
                    connect: {
                        id: JSON.parse(categoryId)
                    }
                }
            }
        })

        return {message: 'Продукт успешно создан!'}
    }

    async update(id: number, dto: ProductDto, images: Array<Express.Multer.File>){
        const filePaths = await this.fileService.createFilesArray(images)

        await this.getById(id)

        const {description, price, name} = dto

        const product = await this.prisma.product.update({
            where: {
                id
            },
            data: {
                description,
                images: filePaths, 
                price: JSON.parse(price),
                name
            }
        })

        return {message: 'Продукт успешно обновлен!'}
    }

    private async checkPages(prismaSearchTermFilter: Prisma.ProductWhereInput,
        perPage: number) {
        const len = await this.prisma.product.count({
            where: prismaSearchTermFilter
        })

        const pages = len > perPage ? Math.trunc(len / perPage) : 1

        if (len % perPage > 0 && pages !== 1)
            return  pages + 1

        return pages
    }
}
