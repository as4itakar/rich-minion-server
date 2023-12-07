import { Body, Controller, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { RolesService } from './roles.service';
import { RoleDto } from './dto/role.dto';


@Controller()
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}


  @UsePipes(new ValidationPipe())
  @Post('roles')
  create(@Body() roleDto: RoleDto){
    return this.rolesService.create(roleDto)
  }
}
