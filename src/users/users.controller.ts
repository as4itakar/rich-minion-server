import { Body, Controller, Get, Param, Patch, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserRoleDto } from './dto/userRole.dto';

@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UsePipes(new ValidationPipe())
  @Patch('/users/addRole/:id')
  addRole(@Param('id') id: string, @Body() roleDto: UserRoleDto){
    return this.usersService.addNewRole(+id, roleDto.value)
  }

  @Get('/users')
  getAll(){
    return 'asdasds'
  }

  @Get('/users/:id')
  getOne(@Param('id') id: string){
    return this.usersService.getUserById(+id)
  }
}
