import { Body, Controller, Get, Param, Patch, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { RoleDto, RoleValuesEnum } from 'src/roles/dto/role.dto';
import { Roles } from 'src/auth/guards/roles-auth.decorator';
import { RolesGuard } from 'src/auth/guards/roles.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Roles(RoleValuesEnum.ADMIN)
  @UseGuards(RolesGuard)
  @UsePipes(new ValidationPipe())
  @Patch('/:id')
  addRole(@Param('id') id: number, @Body() roleDto: RoleDto){
    return this.usersService.addNewRole(id, roleDto.value)
  }

  @Roles(RoleValuesEnum.ADMIN)
  @UseGuards(RolesGuard)
  @Get()
  getAll(){
    return this.usersService.getUsers()
  }

  @Roles(RoleValuesEnum.ADMIN)
  @UseGuards(RolesGuard)
  @Get('/:id')
  getOne(@Param('id') id: number){
    return this.usersService.getUserById(id)
  }
}
