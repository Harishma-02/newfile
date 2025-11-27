import { Injectable, UnauthorizedException } from '@nestjs/common';
import { eq } from 'drizzle-orm';
import * as bcrypt from 'bcryptjs';
import { DatabaseService } from '../database/database.service';
import { users } from '../schema/users';

@Injectable()
export class AuthService {
  constructor(private readonly db: DatabaseService) {}

  // AUTO REGISTER + LOGIN
  async loginOrRegister(name: string, email: string, password: string) {
    // Check if user already exists
    const existingUser = await this.db.db.select().from(users).where(eq(users.email, email));

    // If user exists -> LOGIN
    if (existingUser.length > 0) {
      const user = existingUser[0];

      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        throw new UnauthorizedException('Incorrect password');
      }

      return {
        message: 'Login successful (existing user)',
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
        },
      };
    }

    // If user NOT found → register automatically
    const hash = await bcrypt.hash(password, 10);

    const [newUser] = await this.db.db
      .insert(users)
      .values({
        name,
        email,
        password: hash,
      })
      .returning();

    return {
      message: 'New user registered & login successful',
      user: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
      },
    };
  }
}
