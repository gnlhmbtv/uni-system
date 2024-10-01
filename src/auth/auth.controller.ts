import { Body, Controller, Logger, Post, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiTags } from '@nestjs/swagger';
import { LoginDto } from './auth-dto/login.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() body: LoginDto): Promise<any> {
      const user = await this.authService.validateUser(body.username, body.password);
      if (!user) {
        throw new UnauthorizedException();
      }
      return this.authService.login(user);
  }

  @Post('register')
  async register(@Body() body: {username: string, password: string, fullName:string, email: string, departmentId:number}) {
    console.log(body.username)
    return this.authService.register(body.username, body.password, body.fullName, body.email, body.departmentId)
  }
}
