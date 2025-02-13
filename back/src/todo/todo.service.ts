import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Todo } from './schemas/todo.schema';

@Injectable()
export class TodoService {
  constructor(@InjectModel(Todo.name) private readonly todoModel: Model<Todo>) {}

  async findAll(): Promise<Todo[]> {
    return this.todoModel.find().exec();
  }

  async findOne(id: string): Promise<Todo> {
    const todo = await this.todoModel.findById(id).exec();

    if (!todo) {
      throw new Error('Todo not found');
    }
    return todo;
  }

  async create(todo: Todo): Promise<Todo> {
    const newTodo = new this.todoModel(todo);

    return newTodo.save();
  }

  async update(id: string, todo: Todo): Promise<Todo> {
    const updatedTodo = await this.todoModel.findByIdAndUpdate(id, todo, { new: true }).exec();

    if (!updatedTodo) {
      throw new Error('Todo not found');
    }
    return updatedTodo;
  }

  async delete(id: string): Promise<any> {
    return this.todoModel.findByIdAndDelete(id).exec();
  }
}