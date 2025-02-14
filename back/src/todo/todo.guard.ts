import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { TodoService } from './todo.service';
import { Todo } from './schemas/todo.schema';
import { Types } from 'mongoose';

@Injectable()
export class TodoGuard implements CanActivate {
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
    try {
      const allTodosAssigned: Todo[] = await this.todoService.findAllTodosAssignedToUser(request['userId']);
      if (allTodosAssigned.find(todo => todo.id === request.params.id)) {
        return true;
      }
      throw new UnauthorizedException();
    } catch {
      throw new UnauthorizedException();
    }
  }
}
