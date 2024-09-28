import { Body, Controller, Delete, Get, NotFoundException, Param, Post, Put } from '@nestjs/common';
import { StudentsService } from './students.service';
import { CreateStudentDto } from './student-dto/create-student.dto';
import { Students } from './students.model';
import { UpdateStudentDto } from './student-dto/update-student.dto';

@Controller('students')
export class StudentsController {
  constructor(private studentsService: StudentsService) {}

  @Post()
   CreateStudent(
    @Body() createStudentDto: CreateStudentDto,
  ):Promise<Students> {
    return this.studentsService.createStudent(createStudentDto);
  }

  @Get()
   getAllStudents(): Promise<Students[]> {
    return this.studentsService.getAllStudents();
  }

  @Get(':id')
   getStudentById(@Param('id') id: number):Promise<Students> {
    return this.studentsService.getSingleStudent(id);
  }

  @Put(':id')
  updateStudent(@Param('id') id: number, @Body() updateStudentDto: UpdateStudentDto) {
    return this.studentsService.updateStudent(id, updateStudentDto);
  }

  @Delete(':id')
   deleteStudent(@Param('id') id: number): Promise<string> {
    return this.studentsService.deleteStudent(id);
  }
}
