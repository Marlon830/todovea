import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { User } from '../../user/schemas/user.schema';
import { TodoStatus } from '../todo.status';

@Schema()
export class Todo extends Document {
  @Prop({ required: true })
  title: string;
  
  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  status: TodoStatus;

  @Prop({ type: Types.ObjectId, ref: 'User' })
  owner: Types.ObjectId;
  
  @Prop([{ type: Types.ObjectId, ref: 'User' }])
  assignedUsers: Types.ObjectId[];

  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop({ default: Date.now })
  lastModification: Date;
}

export const TodoSchema = SchemaFactory.createForClass(Todo);