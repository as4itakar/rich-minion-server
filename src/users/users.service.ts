import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { hash } from 'argon2';
import { PrismaService } from 'src/prisma.service';
import { ProfileService } from 'src/profile/profile.service';
import { RoleValuesEnum } from 'src/roles/dto/role.dto';
import { RolesService } from 'src/roles/roles.service';

@Injectable()
export class UsersService {
    
    constructor(private prisma: PrismaService,
        private rolesService: RolesService,
        private profileService: ProfileService){}

    async createSimple(email: string, noHashPas: string, name: string){
        const role = await this.rolesService.getRoleByValue(RoleValuesEnum.USER)

        const user = await this.prisma.users.create({
            data: {
                email,
                password: await hash(noHashPas),

                roles: {
                    create: [
                        {
                            value: role.value,
                            role: {
                                connect: {
                                    id: role.id
                                }
                            }
                        }
                    ]
                }
            },
            include: {
                roles: true
            }
        })

        await this.profileService.create(name, user.id)

        return user
    }

    async addNewRole(id: number, roleValue: string){
        const role = await this.rolesService.getRoleByValue(roleValue)

        await this.prisma.users.update({
            where: {
                id
            },
            data: {
                roles: {
                    create: [
                        {
                            value: role.value,
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

    async getUserByEmailAbsence(email: string){
        const user = await this.prisma.users.findUnique({
            where: {
                email
            },
            include: {
                roles: true
            }
        })

        if (user) throw new BadRequestException('Пользователь уже существует...')

        return user
    }

    async getUserByEmailExistence(email: string){
        const user = await this.prisma.users.findUnique({
            where: {
                email
            },
            include: {
                roles: true
            }
        })

        if (!user) throw new BadRequestException('Такого пользователя не существует...')

        return user
    }

    async getUserById(id: number){
        const user = await this.prisma.users.findUnique({
            where: {
                id
            }
        })

        if (user) throw new BadRequestException('Пользователь уже существует...')

        return user
    }

    async getUsers(){
        const users = await this.prisma.users.findMany({
            include: {
                roles: true,
                company: true,
                profile: true
            }
        })

        console.log(users[0].roles)

        if (!users) throw new NotFoundException('Пользователи не найдены')

        return users
    }
}
