import { Inject, Injectable } from '@nestjs/common';
import { users } from '../schema/users.schema';
import { eq } from 'drizzle-orm';

@Injectable()
export class UsersService {
  constructor(@Inject('DRIZZLE') private db) {}

  create(dto) {
    return this.db.insert(users).values(dto).returning();
  }

  findAll() {
    return this.db.select().from(users);
  }
}
