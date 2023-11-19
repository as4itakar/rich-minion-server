import { Body, Controller, Get, Param, Post, Put, UsePipes, ValidationPipe } from '@nestjs/common';
import { CompanyService } from './company.service';
import { CurrentUser } from 'src/auth/guards/user.decorator';
import { CompanyDto } from './dto/company.dto';
import { Auth } from 'src/auth/guards/auth.decorator';

@Controller('company')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @Auth()
  @Get()
  getCompany(@CurrentUser('id') id: number){
    return this.companyService.getByUserId(id)
  }

  @Auth()
  @UsePipes(new ValidationPipe())
  @Post()
  createCompany(@CurrentUser('id') id: string, @Body() companyDto: CompanyDto){
    return this.companyService.create(+id, companyDto)
  }

  @Auth()
  @UsePipes(new ValidationPipe())
  @Put()
  updateCompany(@CurrentUser('id') id: number, @Body() companyDto: CompanyDto){
    return this.companyService.change(id, companyDto)
  }
}
