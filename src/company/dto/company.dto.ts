import { IsOptional, IsString } from "class-validator";

export class CompanyDto{
    @IsString()
    name: string

    @IsOptional()
    @IsString()
    description?: string

    @IsOptional()
    @IsString()
    image?: string
}