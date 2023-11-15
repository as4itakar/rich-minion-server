import { Injectable, NotFoundException } from '@nestjs/common';
import { PaginationService } from 'src/pagination/pagination.service';
import { PrismaService } from 'src/prisma.service';
import { EnumProductSort, GetAllProductDto } from './dto/get-all-products.dto';
import { Prisma } from '@prisma/client';
import { ProductDto } from './dto/product.dto';

@Injectable()
export class ProductsService {
    constructor(private prisma: PrismaService, private paginationService: PaginationService){}

    async getAll(dto: GetAllProductDto = {}){
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

        const products = await this.prisma.product.findMany({
            where: prismaSearchTermFilter,
            orderBy: prismaSort,
            skip,
            take: perPage
        })

        return {products, length: await this.prisma.product.count({
            where: prismaSearchTermFilter
        })}
    }

    async getById(id: number){
        const product = await this.prisma.product.findUnique({
            where: {
                id
            },
            include: {
                category: true,
                company: true
            }
        })

        if (!product) throw new NotFoundException('Продукт не найден...')

        return product
    }

    async getByCategory(categoryId: number){
        const product = await this.prisma.product.findMany({
            where: {
                category: {
                    id: categoryId
                }
            }
        })

        if (!product) throw new NotFoundException('Продукт не найден...')

        return product
    }

    async getSimular(id: number){
        const currentProduct = await this.getById(id)

        const products = await this.prisma.product.findMany({
            where: {
                category: {
                    name: currentProduct.category.name
                },
                NOT: {
                    id: currentProduct.id
                }
            },
            orderBy: {
                createdAt: 'desc'
            }
        })

        return products
    }

    async create(dto: ProductDto){
        const product = await this.prisma.product.create({
            data: {
                ...dto
            }
        })

        return product
    }

    async update(id: number, dto: ProductDto){
        await this.getById(id)

        const {description, images, price, name} = dto

        const product = await this.prisma.product.update({
            where: {
                id
            },
            data: {
                description,
                images, 
                price,
                name
            }
        })

        return product
    }
}
