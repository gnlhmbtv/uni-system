// src/auth/dto/login.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class LoginDto {
  @ApiProperty({ example: 'gunel123' })
  @IsString()
  username: string;

  @ApiProperty({ example: 'gunel1234' })
  @IsString()
  password: string;
}
