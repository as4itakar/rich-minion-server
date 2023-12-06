import { IsEnum, IsString } from "class-validator";
import { RoleValuesEnum } from "../../roles/dto/role.dto";

export class UserRoleDto{
    @IsString()
    @IsEnum(RoleValuesEnum)
    value: RoleValuesEnum
}