import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class TokensService{

    constructor(private jwt: JwtService){}

    async issueTokens(userId: number){
        const data = {id: userId}

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
}