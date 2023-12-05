import { IsString } from "class-validator";

export class ProductDto{
    @IsString()
    name: string

    @IsString()
    price: string

    @IsString()
    description: string

    @IsString()
    categoryId: string
}