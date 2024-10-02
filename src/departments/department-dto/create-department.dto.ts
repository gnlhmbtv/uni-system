import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateDepartmentDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({description:'name of department'})
  name: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({description:'name of department'})
  faculty: string;
}
