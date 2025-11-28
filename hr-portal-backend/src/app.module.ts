import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { DatabaseService } from './database/database.service';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Makes process.env available globally
    }),
    UsersModule,
    AuthModule,
  ],
  providers: [DatabaseService],
})
export class AppModule {}
