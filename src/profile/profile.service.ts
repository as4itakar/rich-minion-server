import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { ProfileDto } from './dto/profile.dto';
import { returnProduct } from 'src/products/dto/return-product';
import { FileService } from 'src/file/file.service';


@Injectable()
export class ProfileService {
    constructor(private prisma: PrismaService, private fileService: FileService){}

    async create(name: string, userId: number){
        await this.prisma.profile.create({
            data: {
                name,
                user: {
                    connect: {
                        id: userId
                    }
                }
            }
        })
    }

    async get(userId: number){
        const profile = await this.prisma.profile.findUnique({
            where: {
                userId
            },
            select: {
                id: true,
                name: true,
                address: true,
                city: true,
                phone: true,
                image: true,
                favorites: {
                    select: {
                        id: true,
                        product: {
                            select: returnProduct,
                        },
                        productId: true
                    }
                }
            }
        })

        if (!profile) throw new BadRequestException('Пользователь не найден...')

        return profile
    }

    async change(userId: number, dto: ProfileDto, image: Express.Multer.File){
        const imagePath = await this.fileService.createFile(image)

        await this.get(userId)

        return this.prisma.profile.update({
            where: {
                userId
            },
            data: {
                ...dto,
                image: imagePath
            }
        })
    }

    async toggleFavorite(userId: number, productId:number){
        const profile = await this.get(userId)

        const isExist = profile.favorites.some(product => product.productId === productId)

        if (!isExist){
            await this.prisma.favorite.create({
                data: {
                    product: {
                        connect: {
                            id: productId
                        }
                    },
                    user: {
                        connect:{
                            id: profile.id
                        }
                    }
                }
            })

        }else{
            await this.prisma.favorite.deleteMany({
                where:{
                    userId: profile.id,
                    productId
                }
            })
        }
        
        return {message: "Success"}
    }

    async getFavorite(userId: number, productId: number){
        const profile = await this.get(userId)

        const favorite = await this.prisma.favorite.findMany({
            where: {
                userId: profile.id,
                productId
            },
            select: {
                id: true,
                userId: true,
                product: {
                    select: returnProduct
                }
            }
        })

        return favorite
    }
}
