import { Type } from "class-transformer";
import { IsArray, IsEnum, IsNumber, ValidateNested } from "class-validator";

export enum EnumOrderStatus{
    PENDING = 'PENDING',
    PAYED = 'PAYED',
    SHIPPED = 'SHIPPED',
    DELIVERED = 'DELIVERED'
}

export class OrderDto{
    @IsEnum(EnumOrderStatus)
    status: EnumOrderStatus

    @IsArray()
    @ValidateNested({each: true})
    @Type(() => OrderItemDto)
    items: OrderItemDto[]
}

export class OrderItemDto{
    @IsNumber()
    quantity: number
    @IsNumber()
    price: number
    @IsNumber()
    productId: number
}