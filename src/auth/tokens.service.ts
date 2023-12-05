import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class TokensService{

    constructor(private jwt: JwtService){}

    async issueTokens(id: number, email: string, roles: any[]){

        const newRoles = this.changeRole(roles)

        const data = {id, email, newRoles}

        const accessToken = this.jwt.sign(data, {
            expiresIn: '1h'
        })

        const refreshToken = this.jwt.sign(data, {
            expiresIn: '7d'
        })

        return {accessToken, refreshToken}

    }

    async verifyToken(refreshToken: string){
        return this.jwt.verifyAsync(refreshToken)
    }

    changeRole(role: any[]){
        return role.map( role => role.value)
    }
}