import { Body, Controller, Get, Param, Post, Put, UploadedFile, UseGuards, UseInterceptors, UsePipes, ValidationPipe } from '@nestjs/common';
import { CompanyService } from './company.service';
import { CurrentUser } from '../auth/guards/user.decorator';
import { CompanyDto } from './dto/company.dto';
import { Auth } from '../auth/guards/auth.decorator';
import { Roles } from '../auth/guards/roles-auth.decorator';
import { RolesGuard } from '../auth/guards/roles.guard';
import { RoleValuesEnum } from '../roles/dto/role.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller()
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @Auth()
  @Get('/company')
  @Roles(RoleValuesEnum.OWNER)
  @UseGuards(RolesGuard)
  getCompany(@CurrentUser('id') id: string){
    return this.companyService.getByUserId(+id)
  } 

  @Auth()
  @UsePipes(new ValidationPipe())
  @Post('/company')
  @UseInterceptors(FileInterceptor('image'))
  createCompany(@CurrentUser('id') id: string, 
  @Body() companyDto: CompanyDto,
  @UploadedFile() image: Express.Multer.File){
    return this.companyService.create(+id, companyDto, image)
  }

  @Auth()
  @UsePipes(new ValidationPipe())
  @Put('/company')
  @Roles(RoleValuesEnum.OWNER)
  @UseGuards(RolesGuard)
  updateCompany(@CurrentUser('id') id: string, @Body() companyDto: CompanyDto){
    return this.companyService.change(+id, companyDto)
  }

  @Get('/company/all')
  getCompanies(){
    return this.companyService.getAll()
  }


  @Get('/company/one/:id')
  getById(@Param('id') id: string){
    return this.companyService.getById(+id)
  }


}
