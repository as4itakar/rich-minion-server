import { IsOptional, IsString } from "class-validator"

export class ProfileDto{
    @IsString()
    name: string
    @IsString()
    @IsOptional()
    phone?: string
    @IsString()
    @IsOptional()
    city?: string
    @IsString()
    @IsOptional()
    address?: string
}