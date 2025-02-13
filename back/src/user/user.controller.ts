import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './schemas/user.schema';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

//   @Get()
//   async findAll(): Promise<User[]> {
//     return this.userService.findAll();
//   }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<User> {
    return this.userService.findOneById(id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() user: User): Promise<User> {
    return this.userService.update(id, user);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<any> {
    return this.userService.delete(id);
  }
}
