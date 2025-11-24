import { Body, Controller, Get, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUsersDto } from './dto/create-users.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

@Post()
create(@Body() dto: CreateUsersDto) {
  return this.usersService.create(dto);
}

  @Get()
  findAll() {
    return this.usersService.findAll();
  }
}
