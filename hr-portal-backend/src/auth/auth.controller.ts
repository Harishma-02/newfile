import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { signinDto } from '../users/dto/signin.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // Single API → login or auto-register
  @Post('login')
  loginOrRegister(@Body() body: signinDto) {
    return this.authService.loginOrRegister(
      body.name,
      body.email,
      body.password,
    );
  }
}
