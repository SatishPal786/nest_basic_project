import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserDocument } from './entities/user.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<UserDocument>,
  ) {}
  async create(createUserDto: CreateUserDto) {
    try {
      const data = await this.userModel.create(createUserDto);
      if (data) {
        return 'user created successfully';
      }
    } catch (error) {
      throw new Error(error);
    }
  }

  async findAll() {
    try {
      const data = await this.userModel.aggregate([
        { $match: { isDeleted: false } },
      ]);
      console.log(data);

      return data;
    } catch (error) {}
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
