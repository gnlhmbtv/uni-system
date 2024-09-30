import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CreateCourseDto } from './course-dto/create-course.dto';
import { Courses } from './courses.model';
import { UpdateCourseDto } from './course-dto/update-course.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('courses')
@Controller('courses')
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}

  @Post()
  createCourse(@Body() createCourseDto: CreateCourseDto):Promise<Courses> {
    return this.coursesService.createCourse(createCourseDto);
  }

  @Get()
  getAllCourses(): Promise<Courses[]> {
    return this.coursesService.getAllCourses();
  }

  @Get(':id')
  getSingleCourse(@Param('id') id: number): Promise<Courses> {
    return this.coursesService.getSingleCourse(id);
  }

  @Put(':id')
  updateCourse(@Param('id') id: number, @Body() updateCourseDto: UpdateCourseDto) {
    return this.coursesService.updateCourse(id, updateCourseDto);
  }

  @Delete(':id')
  deleteCourse(@Param('id') id: number) {
    return this.coursesService.deleteCourse(id);
  }

}
