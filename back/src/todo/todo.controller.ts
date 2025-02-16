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
    const assignedTodos = await this.todoService.findAllTodosAssignedToUser(userId);
    const ownedTodos = await this.todoService.findAllTodosOwnedByUser(userId);
    const todosToSend = assignedTodos.concat(ownedTodos);
    const uniqueTodos = todosToSend.filter((todo, index, self) =>
      self.findIndex(t => t.id === todo.id) === index
    );
    return uniqueTodos;
  }

  @Post()
  async create(@Req() req: Request, @Body() todo: Todo, @Body('assignedUsers') assignedUsers: string[]): Promise<Todo> {
    const ownerId = req['userId'];
    return await this.todoService.create(todo, ownerId, assignedUsers);
  }
  
  @UseGuards(TodoGuard)
  @Put(':id')
  async update(@Param('id') id: string, @Body() todo: Todo, @Body('owner') ownerId: string, @Body('assignedUsers') assignedUsers: string[]): Promise<Todo> {
    return await this.todoService.update(id, todo, ownerId, assignedUsers);
  }
  
  @UseGuards(TodoGuard)
  @Put('assign/:id')
  async assignUsers(@Param('id') id: string, @Body('userIds') userIds: string[]): Promise<Todo> {
    return await this.todoService.assignUsers(id, userIds);
  }

  @UseGuards(TodoOwnerGuard)
  @Delete(':id')
  async delete(@Param('id') id: string): Promise<any> {
    return await this.todoService.delete(id);
  }
}
