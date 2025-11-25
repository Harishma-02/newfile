import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { DatabaseService } from './database/database.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Makes process.env available globally
    }),
    UsersModule,
  ],
  providers: [DatabaseService],
})
export class AppModule {}
