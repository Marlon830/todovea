import { Controller, Get, Put, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './schemas/user.schema';
import { UserGuard } from './user.guard';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(AuthGuard)
  @Get()
  async findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<User> {
    return this.userService.findOneById(id);
  }

  @UseGuards(UserGuard)
  @Put(':id')
  async update(@Param('id') id: string, @Body() user: User): Promise<User> {
    return this.userService.update(id, user);
  }

  @UseGuards(UserGuard)
  @Delete(':id')
  async delete(@Param('id') id: string): Promise<any> {
    return this.userService.delete(id);
  }
}
