import { IsEnum, IsOptional, IsString } from "class-validator";

export enum RoleValuesEnum{
    USER = 'USER',
    ADMIN = 'ADMIN',
    OWNER = 'OWNER',
    WORKER = 'WORKER'
}

export class RoleDto{
    @IsEnum(RoleValuesEnum)
    @IsString()
    value: RoleValuesEnum

    @IsString()
    @IsOptional()
    description: string
}