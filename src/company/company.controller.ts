import { Body, Controller, Get, Post, Put } from '@nestjs/common';
import { CompanyService } from './company.service';
import { CurrentUser } from 'src/auth/guards/user.decorator';
import { CompanyDto } from './dto/company.dto';

@Controller('company')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @Get()
  getProfile(@CurrentUser('id') id: number){
    return this.companyService.getByUserId(id)
  }

  @Post()
  changeProfile(@CurrentUser('id') id: number, @Body() companyDto: CompanyDto){
    return this.companyService.create(id, companyDto)
  }

  @Put()
  updateProfile(@CurrentUser('id') id: number, @Body() companyDto: CompanyDto){
    return this.companyService.change(id, companyDto)
  }
}
