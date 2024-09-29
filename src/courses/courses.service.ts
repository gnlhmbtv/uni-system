import { Get, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Courses } from './courses.model';
import { Model } from 'sequelize-typescript';
import { CreateDepartmentDto } from '../departments/department-dto/create-department.dto';
import { UpdateDepartmentDto } from '../departments/department-dto/update-department.dto';
import { UpdateCourseDto } from './course-dto/update-course.dto';
import { CreateCourseDto } from './course-dto/create-course.dto';

@Injectable()
export class CoursesService {
  constructor(@InjectModel(Courses) private courseModel: typeof Courses) {}

  //Create course
  createCourse(createCourseDto: CreateCourseDto) {
    return this.courseModel.create(createCourseDto);
  }

  //Get all courses
  getAllCourses(): Promise<Courses[]> {
    return this.courseModel.findAll({where: { state:1 }});
  }

  //Get single course
  getSingleCourse(courseId: number): Promise<Courses> {
    const course = this.courseModel.findOne({
      where: {
        id: courseId,
        state:1
      }
    });
    if (!course) {
      throw new NotFoundException('Course not found');
    }
    return course;
    }


  //Update course
  async updateCourse(id: number, updateCourseDto: UpdateCourseDto): Promise<Courses> {
    const course = await this.courseModel.findByPk(id);
    if (!course) {
      throw new NotFoundException('Course not found');
    }
    return course.update(updateCourseDto);
  }

  //Delete course
  async deleteCourse(courseId: number): Promise<string> {
    const course = await this.courseModel.findOne({
      where:{
        id: courseId,
        state:1
      }
    });
    if (!course) {
      throw new NotFoundException('Course not found');
    }
    course.state = 0;
    await course.save();
    return `Course with ID ${courseId} has been deleted (soft delete).`;
  }
}
