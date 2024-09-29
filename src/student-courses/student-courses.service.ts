import { Body, Injectable, Logger, NotFoundException, Post } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Students } from '../students/students.model';
import { Model } from 'sequelize-typescript';
import { StudentCourses } from './student-courses.model';
import { RegisterCourseDto } from './student-courses-dto/register-course.dto';
import { Courses } from '../courses/courses.model';

@Injectable()
export class StudentCoursesService {
  constructor(
    @InjectModel(StudentCourses) private studentCourseModel: typeof StudentCourses,
    @InjectModel(Students) private studentModel: typeof Students,
    @InjectModel(Courses) private courseModel: typeof Courses
  ) {
  }

  //Register students to course
  async registerCourse(studentId: number, courseId: number): Promise<StudentCourses> {
    const student = await this.studentModel.findOne({
      where: {
        id: studentId,
        state: 1
      }
    })
    if (!student) {
      throw new NotFoundException('Student not found');
    }

    const course = await this.courseModel.findOne({
      where:{
        id: courseId,
        state: 1
      }
    });

    if (!course) {
      throw new NotFoundException('Course not found');
    }
      return this.studentCourseModel.create({ studentId, courseId });
  }

  //Get student courses
  async findCoursesByStudent(studentId: number): Promise<any[]> {
    const studentCourses = await this.studentCourseModel.findAll({
      where: { studentId, state: 1 },
      include: {
        model: Courses,
        attributes: ['id', 'name', 'description'],
        where: {
          state: 1,
        }
      },
    });
    if (studentCourses.length === 0) {
      throw new NotFoundException('This student does not registered any courses');
    }
    return studentCourses.map(sc => ({
      courseId: sc.course.id,
      courseName: sc.course.name,
      courseDescription: sc.course.description,
    }));
  }

}
