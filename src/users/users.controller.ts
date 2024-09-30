import { Body, Controller, Delete, Get, NotFoundException, Param, Post, Put } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './user-dto/create-user.dto';
import { Users } from './users.model';
import { UpdateUserDto } from './user-dto/update-user.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post()
   CreateUser(
    @Body() createUserDto: CreateUserDto,
  ):Promise<Users> {
    return this.usersService.createUser(createUserDto);
  }

  @Get()
   getAllUsers(): Promise<Users[]> {
    return this.usersService.getAllUsers();
  }

  @Get(':id')
   getUserById(@Param('id') id: number):Promise<Users> {
    return this.usersService.getSingleUser(id);
  }

  @Put(':id')
  updateUser(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.updateUser(id, updateUserDto);
  }

  @Delete(':id')
   deleteUser(@Param('id') id: number): Promise<string> {
    return this.usersService.deleteUser(id);
  }
}
