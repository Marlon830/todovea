
import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException,
  } from '@nestjs/common';
  import { Request } from 'express';
  import { TodoService } from './todo.service';
  import { Todo } from './schemas/todo.schema';
  
  @Injectable()
  export class TodoOwnerGuard implements CanActivate {
    constructor(
      private todoService: TodoService,
    ) { }
  
    private extractTokenFromHeader(request: Request): string | undefined {
      const [type, token] = request.headers.authorization?.split(' ') ?? [];
      return type === 'Bearer' ? token : undefined;
    }
  
    async canActivate(context: ExecutionContext): Promise<boolean> {
      const request = context.switchToHttp().getRequest();
      const token = this.extractTokenFromHeader(request);
  
      if (!token) {
        throw new UnauthorizedException();
      }
      // This throws a notfound exception if the todo is not found
      await this.todoService.findOne(request.params.id);
      try {
        const allTodosOwned: Todo[] = await this.todoService.findAllTodosOwnedByUser(request['userId']);
        if (allTodosOwned.find(todo => todo.id === request.params.id)) {
            return true;
        }
        throw new UnauthorizedException();
      } catch {
        throw new UnauthorizedException();
      }
    }
  }
  