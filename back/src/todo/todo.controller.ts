import { Controller, Get, Post, Put, Delete, Body, Param, Req, UseGuards } from '@nestjs/common';
import { TodoService } from './todo.service';
import { Todo } from './schemas/todo.schema';
import { TodoGuard } from './todo.guard';
import { TodoOwnerGuard } from './todo.ownerguard';

@Controller('todos')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Get()
  async getMyTodos(@Req() req: Request): Promise<Todo[]> {
    const userId = req['userId'];
    return await this.todoService.findAllTodosAssignedToUser(userId);
  }

  @Post()
  async create(@Body() todo: Todo): Promise<Todo> {
    return await this.todoService.create(todo);
  }

  @UseGuards(TodoGuard)
  @Put(':id')
  async update(@Param('id') id: string, @Body() todo: Todo): Promise<Todo> {
    return await this.todoService.update(id, todo);
  }
  
  @UseGuards(TodoGuard)
  @Put('assign/:id')
  async assignUser(@Param('id') id: string, @Body('userId') userId: string): Promise<Todo> {
    return await this.todoService.assignUser(id, userId);
  }

  @UseGuards(TodoOwnerGuard)
  @Delete(':id')
  async delete(@Param('id') id: string): Promise<any> {
    return await this.todoService.delete(id);
  }
}
