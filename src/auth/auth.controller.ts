import { Body, Controller, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
import { TokenDto } from './dto/token.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UsePipes(new ValidationPipe())
  @Post('register')
  register(@Body() authDto: AuthDto){
    return this.authService.register(authDto)
  }

  @UsePipes(new ValidationPipe())
  @Post('login')
  login(@Body() authDto: AuthDto){
    return this.authService.login(authDto)
  }

  @UsePipes(new ValidationPipe())
  @Post('login/access-token')
  accessToken(@Body() tokenDto: TokenDto){
    return this.authService.getTokens(tokenDto)
  }
}
