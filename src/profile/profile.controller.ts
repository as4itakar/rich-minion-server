import { Body, Controller, Get, Param, Patch, Put, UploadedFile, UseInterceptors } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { CurrentUser } from '../auth/guards/user.decorator';
import { ProfileDto } from './dto/profile.dto';
import { Auth } from '../auth/guards/auth.decorator';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Auth()
  @Get()
  getProfile(@CurrentUser('id') id: string){
    return this.profileService.get(+id)
  }

  @Auth()
  @Put()
  @UseInterceptors(FileInterceptor('image'))
  changeProfile(@CurrentUser('id') id: string, 
      @Body() profileDto: ProfileDto, @UploadedFile() image: Express.Multer.File){
          return this.profileService.change(+id, profileDto, image)
  }

  @Auth()
  @Patch('/favorites/:productId')
  toggleFav(@CurrentUser('id') id: string, @Param('productId') productId: string){
    return this.profileService.toggleFavorite(+id, +productId)
  }

  @Auth()
  @Get('/favorites/:productId')
  getFavorites(@CurrentUser('id') id: string, @Param('productId') productId: string){
    return this.profileService.getFavorite(+id, +productId)
  }
}
