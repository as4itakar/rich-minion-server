import { Body, Controller, Get, Param, Patch, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { UsersService } from './users.service';
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
  getOne(@Param('id') id: string){
    return this.usersService.getUserById(+id)
  }
}
