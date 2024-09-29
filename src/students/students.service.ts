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
    @InjectModel(Departments) private departmentModel: typeof Departments,
  ) {}

  //Create student
  async createStudent(createStudentDto: CreateStudentDto): Promise<Students> {
    const department = await this.departmentModel.findByPk(createStudentDto.departmentId);
    if (!department) {
      throw new NotFoundException('Department not found');
    }
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
    const student = await this.studentModel.findOne({
      where: {
        id: studentId,
        state: 1
      },
    });
    if (!student) {
      throw new NotFoundException('Student not found');
    }
    return student;
  }

  //Update student
  async updateStudent(id: number, updateStudentDto: UpdateStudentDto): Promise<Students> {
    const student = await this.studentModel.findByPk(id);
    if (!student) {
      throw new NotFoundException('Student not found');
    }
    const {departmentId} = updateStudentDto;
    const department = await this.departmentModel.findOne({
      where:{
        id: departmentId,
        state:1
      }
    })
    if (!department) {
      throw new NotFoundException('Department not found');
    }

    return student.update(updateStudentDto);
  }

  //Delete student
  async deleteStudent(id: number): Promise<string> {
    const student = await this.studentModel.findByPk(id);
    if (!student) {
      throw new NotFoundException('Student not found');
    }
    student.state = 0;
    await student.save();
    return `Student with ID ${id} has been deleted (soft delete).`;
  }
}
