import { Body, Controller, Param, Patch, Put } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { CurrentUser } from 'src/auth/guards/user.decorator';
import { ProfileDto } from './dto/profile.dto';
import { Auth } from 'src/auth/guards/auth.decorator';

@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Auth()
  @Put()
  changeProfile(@CurrentUser('id') id: number, @Body() profileDto: ProfileDto){
    return this.profileService.change(id, profileDto)
  }

  @Auth()
  @Patch('/favorites/:productId')
  toggleFav(@CurrentUser('id') id: number, @Param('productId') productId: number){
    return this.profileService.toggleFavorite(id, productId)
  }
}
