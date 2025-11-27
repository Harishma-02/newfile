import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { users } from '../schema/users.schema';
import { eq } from 'drizzle-orm';
import { CreateUserDto } from './dto/create-users.dto';
import { UpdateUserDto } from './dto/update-users.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private readonly dbService: DatabaseService) {}

  // REGISTER
  async signup(data: CreateUserDto) {
    const hashedPassword = await bcrypt.hash(data.password, 10);
    const result = await this.dbService.db.insert(users)
      .values({ ...data, password: hashedPassword })
      .returning();
    return { id: result[0].id, name: result[0].name, email: result[0].email };
  }

  // LOGIN
  async signin(data: { email: string; password: string }) {
    const result = await this.dbService.db.select().from(users).where(eq(users.email, data.email));
    if (!result.length) throw new UnauthorizedException('Invalid credentials');

    const user = result[0];
    const passwordValid = await bcrypt.compare(data.password, user.password);
    if (!passwordValid) throw new UnauthorizedException('Invalid credentials');

    return { id: user.id, name: user.name, email: user.email };
  }

  // GET ALL USERS
  async findAll() {
    const result = await this.dbService.db.select().from(users);
    return result.map(({ password, ...rest }) => rest);
  }

  // GET ONE USER
  async findOne(id: number) {
    const result = await this.dbService.db.select().from(users).where(eq(users.id, id));
    if (!result.length) throw new NotFoundException('User not found');

    const { password, ...userWithoutPassword } = result[0];
    return userWithoutPassword;
  }

  // UPDATE USER
  async update(id: number, data: UpdateUserDto) {
    if (data.password) {
      data.password = await bcrypt.hash(data.password, 10);
    }

    const result = await this.dbService.db.update(users)
      .set(data)
      .where(eq(users.id, id))
      .returning();

    if (!result.length) throw new NotFoundException('User not found');

    const { password, ...userWithoutPassword } = result[0];
    return userWithoutPassword;
  }

  // DELETE USER
  async remove(id: number) {
    const result = await this.dbService.db.delete(users).where(eq(users.id, id)).returning();
    if (!result.length) throw new NotFoundException('User not found');

    return { message: `User ${id} deleted successfully` };
  }
}

