import { BadRequestException, Injectable } from '@nestjs/common';
import { AuthDto } from './dto/auth.dto';
import { PrismaService } from 'src/prisma.service';
import { UsersService } from 'src/users/users.service';
import { hash } from 'argon2';
import { TokensService } from './tokens.service';

@Injectable()
export class AuthService {

    constructor(private prisma: PrismaService,
        private usersService: UsersService,
        private tokensService: TokensService){}

    async register(dto: AuthDto){
        const existUser = this.usersService.getUserByEmail(dto.email)

        if (existUser) throw new BadRequestException('Пользователь уже существует...')

        const user = await this.prisma.user.create({
            data: {
                email: dto.email,
                password: await hash(dto.password)
            }
        })

        const tokens = this.tokensService.issueTokens(user.id)

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
}
