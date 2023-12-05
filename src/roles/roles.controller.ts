import { Body, Controller, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { RolesService } from './roles.service';
import { RoleDto } from './dto/role.dto';


@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}


  @UsePipes(new ValidationPipe())
  @Post()
  create(@Body() roleDto: RoleDto){
    return this.rolesService.create(roleDto)
  }
}
