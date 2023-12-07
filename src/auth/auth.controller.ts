import { Body, Controller, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
import { TokenDto } from './dto/token.dto';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UsePipes(new ValidationPipe())
  @Post('/auth/register')
  register(@Body() authDto: AuthDto){
    return this.authService.register(authDto)
  }

  @UsePipes(new ValidationPipe())
  @Post('/auth/login')
  login(@Body() authDto: AuthDto){
    return this.authService.login(authDto)
  }

  @UsePipes(new ValidationPipe())
  @Post('/auth/login/access-token')
  accessToken(@Body() tokenDto: TokenDto){
    return this.authService.getTokens(tokenDto)
  }
}
