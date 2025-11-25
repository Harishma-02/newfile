import { Body, Controller, Delete,Get, Post,Patch,Param } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUsersDto } from './dto/create-users.dto';
import { UpdateUsersDto } from '../users/dto/update-users.dto';

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

  @Patch(':id')
updateUser(@Param('id') id: string, @Body() dto: UpdateUsersDto) {
  return this.usersService.update(id, dto);
}
@Delete(':id')
deleteUser(@Param('id') id: string) {
  return this.usersService.delete(id);
}
}
