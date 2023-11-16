import { Body, Controller, Get, Param, Patch } from '@nestjs/common';
import { UsersService } from './users.service';
import { RoleDto } from 'src/roles/dto/role.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Patch('/:id')
  addRole(@Param('id') id: number, @Body() roleDto: RoleDto){
    return this.usersService.addNewRole(id, roleDto.value)
  }

  @Get()
  getAll(){
    return this.usersService.getUsers()
  }

  @Get('/:id')
  getOne(@Param('id') id: number){
    return this.usersService.getUserById(id)
  }
}
