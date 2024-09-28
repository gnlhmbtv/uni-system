import { Module } from '@nestjs/common';
import { CoursesController } from './courses.controller';
import { CoursesService } from './courses.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Departments } from '../departments/departments.model';
import { Courses } from './courses.model';

@Module({
  imports: [SequelizeModule.forFeature([Courses])],
  controllers: [CoursesController],
  providers: [CoursesService]
})
export class CoursesModule {}
