import { IsEmail, IsString, MinLength } from "class-validator";

export class AuthDto{
    @IsEmail()
    @IsString()
    email: string

    @MinLength(6, {message: 'Минимальная длина пароль 6 символов...'})
    @IsString()
    password: string
}