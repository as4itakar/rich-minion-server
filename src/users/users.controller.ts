import { Body, Controller, Get, Param, Patch, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { RoleValuesEnum } from 'src/roles/dto/role.dto';
import { Roles } from 'src/auth/guards/roles-auth.decorator';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { UserRoleDto } from './dto/userRole.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UsePipes(new ValidationPipe())
  @Patch('addRole/:id')
  addRole(@Param('id') id: string, @Body() roleDto: UserRoleDto){
    return this.usersService.addNewRole(+id, roleDto.value)
  }

  @Get()
  getAll(){
    return 'asdasds'
  }

  @Get('/:id')
  getOne(@Param('id') id: number){
    return this.usersService.getUserById(id)
  }
}
