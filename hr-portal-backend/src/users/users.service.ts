import { Injectable } from '@nestjs/common';
import { User } from './users.module';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  delete(arg0: number) {
    throw new Error('Method not implemented.');
  }
  private users: User[] = [];
  private nextId = 1;

  create(dto: CreateUserDto): User {
    const newUser: User = {
      id: this.nextId++,   // <-- FIX
      ...dto,
    };

    this.users.push(newUser);
    return newUser;
  }

  findAll(): User[] {
    return this.users;
  }

  findOne(id: number): User {
    const user = this.users.find((u) => u.id === id);
    if (!user) throw new Error('User not found');
    return user;
  }

  update(id: number, dto: Partial<CreateUserDto>): User {
    const user = this.findOne(id);
    Object.assign(user, dto);
    return user;
  }

  remove(id: number): User {
    const user = this.findOne(id);
    this.users = this.users.filter((u) => u.id !== id);
    return user;
  }
}
