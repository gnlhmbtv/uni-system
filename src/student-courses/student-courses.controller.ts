import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { StudentsService } from '../students/students.service';
import { StudentCoursesService } from './student-courses.service';
import { StudentCourses } from './student-courses.model';
import { CreateCourseDto } from '../courses/course-dto/create-course.dto';
import { RegisterCourseDto } from './student-courses-dto/register-course.dto';
import { Courses } from '../courses/courses.model';
import { ApiBody, ApiTags } from '@nestjs/swagger';

@ApiTags('tudent-courses')
@Controller('student-courses')
export class StudentCoursesController {
  constructor(private readonly studentCourseService: StudentCoursesService) {}

  @Post()
  @ApiBody({ type: RegisterCourseDto })
  registerCourse(@Body('studentId') studentId: number, @Body('courseId') courseId:number):Promise<StudentCourses> {
    return this.studentCourseService.registerCourse(studentId, courseId);
  }

  @Get('student/:studentId')
  async getStudentCourses(@Param('studentId') studentId:number) {
    return await this.studentCourseService.getCoursesByStudentId(studentId);
  }


}
