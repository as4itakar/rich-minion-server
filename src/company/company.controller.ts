import { Body, Controller, Get, Param, Post, Put, UploadedFile, UseGuards, UseInterceptors, UsePipes, ValidationPipe } from '@nestjs/common';
import { CompanyService } from './company.service';
import { CurrentUser } from 'src/auth/guards/user.decorator';
import { CompanyDto } from './dto/company.dto';
import { Auth } from 'src/auth/guards/auth.decorator';
import { Roles } from 'src/auth/guards/roles-auth.decorator';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { RoleValuesEnum } from 'src/roles/dto/role.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('company')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @Auth()
  @Get()
  @Roles(RoleValuesEnum.OWNER)
  @UseGuards(RolesGuard)
  getCompany(@CurrentUser('id') id: string){
    console.log('asd')
    return this.companyService.getByUserId(+id)
  } 

  @Auth()
  @UsePipes(new ValidationPipe())
  @Post()
  @UseInterceptors(FileInterceptor('image'))
  createCompany(@CurrentUser('id') id: string, 
  @Body() companyDto: CompanyDto,
  @UploadedFile() image: Express.Multer.File){
    return this.companyService.create(+id, companyDto, image)
  }

  @Auth()
  @UsePipes(new ValidationPipe())
  @Put()
  @Roles(RoleValuesEnum.OWNER)
  @UseGuards(RolesGuard)
  updateCompany(@CurrentUser('id') id: string, @Body() companyDto: CompanyDto){
    return this.companyService.change(+id, companyDto)
  }

  @Get('/all')
  getCompanies(){
    return this.companyService.getAll()
  }


  @Get('/one/:id')
  getById(@Param('id') id: string){
    return this.companyService.getById(+id)
  }


}
