import { IsEnum, IsNumber, IsString } from "class-validator";

export enum EnumOrderStatus{
    PENDING = 'PENDING',
    PAYED = 'PAYED',
    SHIPPED = 'SHIPPED',
    DELIVERED = 'DELIVERED'
}

export class OrderItemDto{
    @IsNumber()
    quantity: number

    @IsNumber()
    price: number
}