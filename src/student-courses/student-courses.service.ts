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
    const student = await this.studentModel.findByPk(studentId);
    const course = await this.courseModel.findByPk(courseId);

    if (student && course) {
      return this.studentCourseModel.create({ studentId, courseId });
    }
    throw new Error('Student or Course not found');
    return this.studentCourseModel.create({ studentId, courseId });
  }


  async getCoursesByStudentId(studentId: number) {
    const student = await this.studentModel.findByPk(studentId, {
      include: [
        {
          model: Courses,
          through: { attributes: [] }
        },
      ],
    });

    if (!student) {
      throw new Error('Student not found');
    }

    const formattedResponse = {
      student: {
        id: student.id,
        fullName: student.fullName,
        email: student.email,
        department: student.department ? student.department.name : null,
      },
      courses: student.courses.map((course) => ({
        id: course.id,
        name: course.name,
        description: course.description,
      })),
    };

    return formattedResponse;
  }

}
