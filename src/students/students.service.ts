import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Students } from './students.model';
import { Model } from 'sequelize-typescript';
import { CreateStudentDto } from './student-dto/create-student.dto';
import { Departments } from '../departments/departments.model';
import { UpdateStudentDto } from './student-dto/update-student.dto';

@Injectable()
export class StudentsService {
  constructor(
    @InjectModel(Students) private studentModel: typeof Students,
  ) {}

  //Create student
  async createStudent(createStudentDto: CreateStudentDto): Promise<Students> {
      return this.studentModel.create(createStudentDto);
  }

  //Get all students
  async getAllStudents(): Promise<Students[]> {
    return await this.studentModel.findAll({
      where: { state:1 },
    });
  }

  //Get single student
  async getSingleStudent(studentId: number): Promise<Students> {
    return await this.studentModel.findByPk(studentId);
  }

  //Update student
  async updateStudent(id: number, updateStudentDto: UpdateStudentDto): Promise<Students> {
    const student = await this.studentModel.findByPk(id);
    if (!student) {
      throw new NotFoundException('Department not found');
    }
    return student.update(updateStudentDto);
  }

  //Delete student
  async deleteStudent(id: number): Promise<string> {
    const student = await this.studentModel.findByPk(id);
    if (!student) {
      throw new NotFoundException('Department not found');
    }
    student.state = 0;
    await student.save();
    return `Student with ID ${id} has been deleted (soft delete).`;
  }
}
