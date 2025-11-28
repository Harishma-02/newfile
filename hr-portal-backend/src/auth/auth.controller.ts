// auth.controller.ts
import { Controller, Post, Body, Get, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  signup(@Body() body: any) {
    return this.authService.signup(body.name,body.email, body.password);
  }

  @Post('signin')
  signin(@Body() body: any) {
    return this.authService.signin(body.email, body.password);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  profile() {
    return { message: 'Protected Route Working!' };
  }
}
