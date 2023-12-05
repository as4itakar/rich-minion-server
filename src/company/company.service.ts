import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CompanyDto } from './dto/company.dto';
import { UsersService } from 'src/users/users.service';
import { RoleValuesEnum } from 'src/roles/dto/role.dto';
import { FileService } from 'src/file/file.service';
import { returnCompany } from './dto/return-company';

@Injectable()
export class CompanyService {
    constructor(private prisma: PrismaService,
        private usersService: UsersService,
        private fileService: FileService){}

    async create(userId: number, dto: CompanyDto, image: Express.Multer.File){
        const imagePath = await this.fileService.createFile(image)

        await this.usersService.addNewRole(userId, RoleValuesEnum.OWNER)
        
        const company = await this.prisma.company.create({
            data: {
                ...dto,
                image: imagePath,
                user: {
                    connect: {
                        id: userId
                    }
                }
            }
        })

        return company
    }

    async getAll(){
        const companies = await this.prisma.company.findMany()

        if (!companies) throw new NotFoundException('Комппаний не найдено...')

        return companies
    }

    async getByUserId(userId: number){
        const company = await this.prisma.company.findUnique({
            where: {
                userId
            },
            select: returnCompany
        })

        if (!company) throw new BadRequestException('Такая компания не найдена...')

        return company
    }

    async getById(id: number){
        const company = await this.prisma.company.findUnique({
            where: {
                id
            },
            select: returnCompany
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
