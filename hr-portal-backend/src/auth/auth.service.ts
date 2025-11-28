import { Injectable, UnauthorizedException } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { JwtService } from '@nestjs/jwt';
import { users } from '../schema/users.schema';
import { eq } from 'drizzle-orm';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly db: DatabaseService,
  ) {}

  async signup(name:string , email: string, password: string) {
    const hashed = await bcrypt.hash(password, 10);

    const result = await this.db.db
      .insert(users)
      .values({name, email, password: hashed })
      .returning();

    return { message: 'User created', result };
  }

  async signin(email: string, password: string) {
    const user = await this.db.db
      .select()
      .from(users)
      .where(eq(users.email, email));

    if (!user.length) throw new UnauthorizedException('Invalid credentials');

    const match = await bcrypt.compare(password, user[0].password);
    if (!match) throw new UnauthorizedException('Invalid credentials');

const token = this.jwtService.sign(
  { id: user[0].id, email: user[0].email },
  { expiresIn: '10m' }
);

    return { access_token: token };
  }
}
