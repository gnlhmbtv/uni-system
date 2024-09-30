import { Module } from '@nestjs/common';
import { StudentCoursesController } from './student-courses.controller';
import { StudentCoursesService } from './student-courses.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Departments } from '../departments/departments.model';
import { StudentCourses } from './student-courses.model';
import { Users } from '../users/users.model';
import { Courses } from '../courses/courses.model';

@Module({
  imports: [
    SequelizeModule.forFeature([Users, Courses, StudentCourses])
  ],
  controllers: [StudentCoursesController],
  providers: [StudentCoursesService]
})
export class StudentCoursesModule {}
