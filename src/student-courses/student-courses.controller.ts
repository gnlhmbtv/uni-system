import { Body, Controller, Get, Param, Post, Req, Logger, UseGuards } from '@nestjs/common';
import { StudentCoursesService } from './student-courses.service';
import { StudentCourses } from './student-courses.model';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('student-courses')
@Controller('student-courses')
export class StudentCoursesController {
  constructor(private readonly studentCourseService: StudentCoursesService) {}

  @Post()
  registerCourse(@Body('studentId') studentId: number, @Body('courseId') courseId:number):Promise<StudentCourses> {
    return this.studentCourseService.registerCourse(studentId, courseId);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('my-courses')
  getUserCourses(@Req() req): Promise<any> {
    const userId = req.user?.userId;
    console.log('REQUESTT::', req.user);
    Logger.log(req.user);

    return this.studentCourseService.findCoursesByStudent(userId);
  }


}
