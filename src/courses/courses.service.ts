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
  getSingleCourse(id: number): Promise<Courses> {
    return this.courseModel.findByPk(id);
  }

  //Update course
  async updateCourse(id: number, updateCourseDto: UpdateCourseDto): Promise<Courses> {
    const course = await this.courseModel.findByPk(id);
    if (!course) {
      throw new NotFoundException('Department not found');
    }
    return course.update(updateCourseDto);
  }

  //Delete course
  async deleteCourse(id: number): Promise<string> {
    const course = await this.courseModel.findByPk(id);
    if (!course) {
      throw new NotFoundException('Department not found');
    }
    course.state = 0;
    await course.save();
    return `Course with ID ${id} has been deleted (soft delete).`;
  }
}
