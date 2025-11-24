import { Injectable } from '@nestjs/common';
import { DrizzleService } from './database/drizzle.service';

@Injectable()
export class AppService {
  constructor(private drizzleService: DrizzleService) {}

  getHello() {
    return 'Hello World!';
  }
}
