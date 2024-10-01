import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UsersService,
              private readonly jwtService: JwtService
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.userService.findByUserName(username);
    if(user && await bcrypt.compare(password, user.password)) {
      const {password, ...result} = user;
      return result;
    }
    return null;
  }

  async login(user: any): Promise<{ access_token: string }> {
    console.log('USER INFOOOOOO:', user.dataValues);
    const payload = {sub: user.dataValues.id, username: user.dataValues.username };
    console.log('PAYLOAAAADDDDD:', payload);
    const token = this.jwtService.sign(payload);
    return {access_token: token};
  }

  async register(username: string, password: string, fullName: string, email: string, departmentId: number){
    const hashedPassword = await bcrypt.hash(password, 10)
    return this.userService.createUser({
      fullName,
      email,
      departmentId,
      username,
      password : hashedPassword,
    });
  }
}
