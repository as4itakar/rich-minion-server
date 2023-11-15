import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { RoleDto } from './dto/role.dto';

@Injectable()
export class RolesService {
    constructor(private prisma: PrismaService){}

    async create(dto: RoleDto){
        const role = await this.prisma.role.create({
            data: {
                ...dto
            }
        })

        return role
    }

    async getRoleByValue(value: string){
        const role = await this.prisma.role.findUnique({
            where: {
                value
            }
        })

        if (!role) throw new NotFoundException('Роли не найдено')

        return role
    }
}
