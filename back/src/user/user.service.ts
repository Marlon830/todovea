import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './schemas/user.schema';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private readonly userModel: Model<User>) {}

//   async findAll(): Promise<User[]> {
//     return this.userModel.find().exec();
//   }

  async findOneById(id: string): Promise<User> {
    const user = await this.userModel.findById(id).exec();

    if (!user) {
      throw new Error('User not found');
    }
    return user;
  }

  async findOneByUsername(username: string): Promise<User> {
    const user = await this.userModel.findOne({ username }).exec();

    if (!user) {
      throw new Error('User not found');
    }
    return user;
  }

  async create(user: User): Promise<User> {
    const hashedPassword = await bcrypt.hash(user.password, 10);
    const newUser = new this.userModel(user);

    newUser.password = hashedPassword;
    return newUser.save();
  }

  async update(id: string, user: User): Promise<User> {
    const updatedUser = await this.userModel.findByIdAndUpdate(id, user, { new: true }).exec();

    if (!updatedUser) {
      throw new Error('User not found');
    }
    return updatedUser;
  }

  async delete(id: string): Promise<any> {
    return this.userModel.findByIdAndDelete(id).exec();
  }
}