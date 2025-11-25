import { Injectable, Inject } from '@nestjs/common';
import { users } from '../schema/users.schema';
import { eq } from 'drizzle-orm';
import { UpdateUsersDto } from './dto/update-users.dto';

@Injectable()
export class UsersService {
  constructor(@Inject('DRIZZLE') private db) {}

  create(dto) {
    return this.db.insert(users).values(dto).returning();
  }

  findAll() {
    return this.db.select().from(users);
  }

  findOne(id: string) {
    return this.db
      .select()
      .from(users)
      .where(eq(users.id, Number(id)))
      .limit(1); // optional
  }

  update(id: string, dto:UpdateUsersDto) {
    return this.db
      .update(users)
      .set(dto)
      .where(eq(users.id, Number(id)))
      .returning();
  }

  remove(id: string) {
    return this.db
      .delete(users)
      .where(eq(users.id, Number(id)))
      .returning();
  }
}

