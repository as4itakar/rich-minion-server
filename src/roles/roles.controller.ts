import { Body, Controller, Post, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { RolesService } from './roles.service';
import { RoleDto, RoleValuesEnum } from './dto/role.dto';
import { Roles } from 'src/auth/guards/roles-auth.decorator';
import { RolesGuard } from 'src/auth/guards/roles.guard';

@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}


  @UsePipes(new ValidationPipe())
  @Post()
  create(@Body() roleDto: RoleDto){
    return this.rolesService.create(roleDto)
  }
}
