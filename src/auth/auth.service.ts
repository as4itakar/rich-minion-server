import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthDto } from './dto/auth.dto';
import { PrismaService } from 'src/prisma.service';
import { UsersService } from 'src/users/users.service';
import { hash } from 'argon2';
import { TokensService } from './tokens.service';
import { TokenDto } from './dto/token.dto';
import { verify } from 'argon2';
import { RolesService } from 'src/roles/roles.service';
import { RoleValuesEnum } from 'src/roles/dto/role.dto';

@Injectable()
export class AuthService {

    constructor(private prisma: PrismaService,
        private usersService: UsersService,
        private tokensService: TokensService,
        private rolesService: RolesService){}

    async register(dto: AuthDto){
        await this.usersService.getUserByEmail(dto.email)

        const role = await this.rolesService.getRoleByValue(RoleValuesEnum.USER)

        const user = await this.prisma.user.create({
            data: {
                email: dto.email,
                password: await hash(dto.password),

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

        const tokens = this.tokensService.issueTokens(user.id)

        return {
            user: this.userObj(user.email, user.password),
            ...tokens
        }
    }

    async login(dto: AuthDto){
        const user = await this.validateUser(dto)
        const tokens = await this.tokensService.issueTokens(user.id)
        
        return {
            user: this.userObj(user.email, user.password),
            ...tokens
        }
    }

    async getTokens(dto: TokenDto){
        const res = await this.tokensService.verifyToken(dto.refreshToken)

        if (!res) throw new UnauthorizedException('Некорректный токен...')

        const user = await this.usersService.getUserById(res.id)

        const tokens = await this.tokensService.issueTokens(user.id)

        return {
            user: this.userObj(user.email, user.password),
            ...tokens
        }
    }

    private userObj(email: string, password: string){
        return {
            email,
            password 
        }
    }

    private async validateUser(dto: AuthDto){
        const existUser = await this.usersService.getUserByEmail(dto.email)

        const isValid = await verify(existUser.password, dto.password)

        if (!isValid) throw new UnauthorizedException('Некорректный пароль...')

        return existUser
    }
}
