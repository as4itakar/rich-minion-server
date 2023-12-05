import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthDto } from './dto/auth.dto';
import { UsersService } from 'src/users/users.service';
import { TokensService } from './tokens.service';
import { TokenDto } from './dto/token.dto';
import { verify } from 'argon2';

@Injectable()
export class AuthService {

    constructor(
        private usersService: UsersService,
        private tokensService: TokensService){}

    async register(dto: AuthDto){
        await this.usersService.getUserByEmailAbsence(dto.email)

        const user = await this.usersService.createSimple(dto.email, dto.password, dto.name)

        const tokens = await this.tokensService.issueTokens(user.id, user.email, user.roles)

        return {
            user: this.userObj(user.email, user.id, user.roles),
            ...tokens
        }
    }

    async login(dto: AuthDto){
        const user = await this.validateUser(dto)
        const tokens = await this.tokensService.issueTokens(user.id, user.email, user.roles)
        
        return {
            user: this.userObj(user.email, user.id, user.roles),
            ...tokens
        }
    }

    async getTokens(dto: TokenDto){
        const res = await this.tokensService.verifyToken(dto.refreshToken)

        if (!res) throw new UnauthorizedException('Некорректный токен...')

        const user = await this.usersService.getUserByEmailExistence(res.email)

        const tokens = await this.tokensService.issueTokens(user.id, user.email, user.roles)

        return {
            user: this.userObj(user.email, user.id, user.roles),
            ...tokens
        }
    }

    private userObj(email: string, id: number, roles: any[]){
        const cleanedRoles = this.tokensService.changeRole(roles)
        
        return {
            id,
            email,
            roles: cleanedRoles
        }
    }

    private async validateUser(dto: AuthDto){
        const existUser = await this.usersService.getUserByEmailExistence(dto.email)

        const isValid = await verify(existUser.password, dto.password)

        if (!isValid) throw new UnauthorizedException('Некорректный пароль...')

        return existUser
    }
}
