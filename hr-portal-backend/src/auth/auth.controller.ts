import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from '../users/dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // Single API → login or auto-register
  @Post('login')
  loginOrRegister(@Body() body: LoginDto) {
    return this.authService.loginOrRegister(
      body.name,
      body.email,
      body.password,
    );
  }
}
