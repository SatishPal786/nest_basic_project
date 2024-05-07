import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserDocument } from './entities/user.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcryptjs from 'bcryptjs';
@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<UserDocument>,
  ) {}
  async create(createUserDto: CreateUserDto) {
    try {
      const password = await bcryptjs.hash(createUserDto.password, 10);
      createUserDto.password = password;

      const data = await this.userModel.create(createUserDto);
      if (data) {
        return 'user created successfully';
      } else {
        return 'Something went wrong';
      }
    } catch (error) {
      throw new Error(error);
    }
  }

  async loginUser(email: string, password: string) {
    try {
      console.log(email, 'email');

      const user = await this.userModel.findOne({ email: email });
      console.log(user, 'user');
    } catch (error) {
      throw new Error(error);
    }
  }

  async findAll() {
    try {
      const data = await this.userModel.aggregate([
        { $match: { isDeleted: false } },
      ]);
      if (data.length > 0) {
        return data;
      } else {
        return 'Data not found';
      }
    } catch (error) {
      throw new Error(error);
    }
  }

  async findOne(id: string) {
    try {
      const data = await this.userModel.findOne({ where: { _id: id } });
      if (data) {
        return data;
      } else {
        return 'Record not found';
      }
    } catch (error) {
      throw new Error(error);
    }
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
