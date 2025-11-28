import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { DatabaseService } from '../database/database.service';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
     PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'secret123',
      signOptions: { expiresIn: '10m' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, DatabaseService,JwtStrategy],
  exports: [AuthService,PassportModule],
})
export class AuthModule {}
