import { Body, Injectable, Logger, NotFoundException, Post } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import {  Users } from '../users/users.model';
import { Model } from 'sequelize-typescript';
import { StudentCourses } from './student-courses.model';
import { RegisterCourseDto } from './student-courses-dto/register-course.dto';
import { Courses } from '../courses/courses.model';

@Injectable()
export class StudentCoursesService {
  constructor(
    @InjectModel(StudentCourses) private studentCourseModel: typeof StudentCourses,
    @InjectModel(Users) private userModel: typeof Users,
    @InjectModel(Courses) private courseModel: typeof Courses
  ) {
  }

  //Register users to course
  async registerCourse(userId: number, courseId: number): Promise<StudentCourses> {
    const user = await this.userModel.findOne({
      where: {
        id: userId,
        state: 1
      }
    })
    if (!user) {
      throw new NotFoundException('User not found');
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
      return this.studentCourseModel.create({ userId, courseId });
  }

  //Get user courses
  async findCoursesByStudent(userId: number): Promise<any> {
    const studentCourses = await this.studentCourseModel.findAll({
      where: { userId, state: 1 },
      include: {
        model: Courses,
        attributes: ['id', 'name', 'description'],
        where: { state: 1}
      },
    });
    if (studentCourses.length === 0) {
      throw new NotFoundException('This user does not registered any courses');
    }
    return studentCourses.map(c => ({
      courseId: c.course.id,
      courseName: c.course.name,
      courseDescription: c.course.description,
    }));
  }

  //Get course users
  async findStudentsByCourse(courseId: number): Promise<any> {
    const courseStudents = await this.studentCourseModel.findAll({
      where: {courseId, state: 1 },
      include: {
        model: Users,
        attributes: ['id', 'fullName', 'email'],
        where: {state: 1}
      }
    });
    if (courseStudents.length === 0) {
      throw new NotFoundException('There is no registered student');
    }
    return courseStudents.map(s => ({
      studentId: s.user.id,
      studentName: s.user.fullName,
      studentEmail: s.user.email
    }))
  }
}
