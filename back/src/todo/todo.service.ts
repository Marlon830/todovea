import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Todo } from './schemas/todo.schema';
import { Types } from 'mongoose';

@Injectable()
export class TodoService {
  constructor(@InjectModel(Todo.name) private readonly todoModel: Model<Todo>) {}

  async findAllTodosAssignedToUser(userId: string): Promise<Todo[]> {
    return this.todoModel.find({ assignedUsers: Types.ObjectId.createFromHexString(userId) }).exec();
  }

  async findAllTodosOwnedByUser(userId: string): Promise<Todo[]> {
    return this.todoModel.find({ owner: Types.ObjectId.createFromHexString(userId) }).exec();
  }

  async findOne(id: string): Promise<Todo> {
    const todo = await this.todoModel.findById(id).exec();

    if (!todo) {
      throw new NotFoundException('Todo not found');
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
      throw new NotFoundException('Todo not found');
    }
    return updatedTodo;
  }

  async assignUser(id: string, userId: string): Promise<Todo> {
    const updatedTodo = await this.todoModel.findById(id).exec();

    if (!updatedTodo) {
      throw new NotFoundException('Todo not found');
    }
    updatedTodo.isNew = false;
    updatedTodo.assignedUsers.push(Types.ObjectId.createFromHexString(userId));
    updatedTodo.save();
    return updatedTodo;
  }

  async delete(id: string): Promise<any> {
    return this.todoModel.findByIdAndDelete(id).exec();
  }
}