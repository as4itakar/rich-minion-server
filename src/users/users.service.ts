import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { hash } from 'argon2';
import { PrismaService } from 'src/prisma.service';
import { RoleValuesEnum } from 'src/roles/dto/role.dto';
import { RolesService } from 'src/roles/roles.service';

@Injectable()
export class UsersService {
    
    constructor(private prisma: PrismaService,
        private rolesService: RolesService){}

    async createSimple(email: string, noHashPas: string){
        const role = await this.rolesService.getRoleByValue(RoleValuesEnum.USER)

        const user = await this.prisma.user.create({
            data: {
                email,
                password: await hash(noHashPas),

                roles: {
                    create: [
                        {
                            role: {
                                connect: {
                                    id: role.id
                                }
                            }
                        }
                    ]
                }
            }
        })

        return user
    }

    async addNewRole(id: number, roleValue: string){
        const role = await this.rolesService.getRoleByValue(roleValue)

        await this.prisma.user.update({
            where: {
                id
            },
            data: {
                roles: {
                    create: [
                        {
                            role: {
                                connect: {
                                    id: role.id
                                }
                            }
                        }
                    ]
                }
            }
        })

        return { message: 'Success' }
    }

    async getUserByEmail(email: string){
        const user = await this.prisma.user.findUnique({
            where: {
                email
            }
        })

        if (user) throw new BadRequestException('Пользователь уже существует...')

        return user
    }

    async getUserById(id: number){
        const user = await this.prisma.user.findUnique({
            where: {
                id
            }
        })

        if (user) throw new BadRequestException('Пользователь уже существует...')

        return user
    }

    async getUsers(){
        const users = await this.prisma.user.findMany({})

        if (!users) throw new NotFoundException('Пользователи не найдены')

        return users
    }
}
