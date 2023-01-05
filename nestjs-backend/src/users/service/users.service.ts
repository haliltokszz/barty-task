/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from '../dtos/create-user.dto';
import { User, UserDocument } from '../entity/users.model';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel('user') private readonly userModel: Model<UserDocument>,
  ) {}
  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const user = new this.userModel(createUserDto);
    return user.save();
  }
  async getUser(query: object): Promise<User> {
    return this.userModel.findOne(query).exec();
  }
  async getUserById(id: string): Promise<User> {
    return this.userModel.findById(id).exec();
  }
  async getUsers(): Promise<User[]> {
    return this.userModel.find().exec();
  }
  async updateUser(query: object, update: UserDocument): Promise<any> {
    return this.userModel.updateOne(query, update).exec();
  }
  async deleteUser(query: object): Promise<User> {
    return this.userModel.findOneAndDelete(query).exec();
  }
  async getUsersCount(query: object): Promise<number> {
    return this.userModel.countDocuments(query).exec();
  }
  async getUsersWithPagination(
    query: object,
    page: number,
    limit: number,
  ): Promise<User[]> {
    return this.userModel.find(query).skip(page * limit).limit(limit).exec();
  }
}
