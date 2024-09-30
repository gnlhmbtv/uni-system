import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Users } from './users.model';
import { Model } from 'sequelize-typescript';
import { CreateUserDto } from './user-dto/create-user.dto';
import { Departments } from '../departments/departments.model';
import { UpdateUserDto } from './user-dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(Users) private userModel: typeof Users,
    @InjectModel(Departments) private departmentModel: typeof Departments,
  ) {}

  //Find by username
  async findByUserName(username: string): Promise<Users | undefined> {
      return await this.userModel.findOne({ where: { username } });
  }

  //Create user
  async createUser(createUserDto: CreateUserDto): Promise<Users> {
    const department = await this.departmentModel.findByPk(createUserDto.departmentId);
    if (!department) {
      throw new NotFoundException('Department not found');
    }
      return this.userModel.create(createUserDto);
  }

  //Get all users
  async getAllUsers(): Promise<Users[]> {
    return await this.userModel.findAll({
      where: { state:1 },
    });
  }

  //Get single user
  async getSingleUser(userId: number): Promise<Users> {
    const user = await this.userModel.findOne({
      where: {
        id: userId,
        state: 1
      },
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  //Update user
  async updateUser(id: number, updateUserDto: UpdateUserDto): Promise<Users> {
    const user = await this.userModel.findByPk(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    const {departmentId} = updateUserDto;
    const department = await this.departmentModel.findOne({
      where:{
        id: departmentId,
        state:1
      }
    })
    if (!department) {
      throw new NotFoundException('Department not found');
    }

    return user.update(updateUserDto);
  }

  //Delete user
  async deleteUser(id: number): Promise<string> {
    const user = await this.userModel.findByPk(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    user.state = 0;
    await user.save();
    return `User with ID ${id} has been deleted (soft delete).`;
  }
}
