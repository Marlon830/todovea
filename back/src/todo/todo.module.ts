import { MiddlewareConsumer, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TodoService } from './todo.service';
import { TodoController } from './todo.controller';
import { Todo, TodoSchema } from './schemas/todo.schema';
import { AuthMiddleware } from 'src/auth/auth.middleware';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [MongooseModule.forFeature([{ name: Todo.name, schema: TodoSchema }]), AuthModule],
  providers: [TodoService],
  controllers: [TodoController]
})
export class TodoModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes(TodoController);
  }
}
