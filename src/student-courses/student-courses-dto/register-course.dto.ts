import { IsString, IsNotEmpty } from 'class-validator';

export class RegisterCourseDto {
  @IsNotEmpty()
  studentId: number;

  @IsNotEmpty()
  courseId: number;
}
