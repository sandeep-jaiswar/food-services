import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './interfaces/user.interface';
import { CreateUserDTO } from './dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

  async addUser(createUserDTO: CreateUserDTO): Promise<User> {
    const newUser = await new this.userModel(createUserDTO);
    return newUser.save();
  }

  async getUser(userID): Promise<User> {
    const user = await this.userModel.findById(userID).exec();
    return user;
  }

  async getUsers(): Promise<User[]> {
    const user = await this.userModel.find().exec();
    return user;
  }

  async editUser(userID, createUserDTO: CreateUserDTO): Promise<User> {
    const editedUser = await this.userModel.findByIdAndUpdate(
      userID,
      createUserDTO,
      { new: true },
    );
    return editedUser;
  }

  async deleteUser(userID): Promise<any> {
    const deletedUser = await this.userModel.findByIdAndRemove(userID);
    return deletedUser;
  }
}
