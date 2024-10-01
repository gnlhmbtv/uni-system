import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { DepartmentsService } from './departments.service';
import {CreateDepartmentDto} from './department-dto/create-department.dto';
import { Departments } from './departments.model';
import { UpdateDepartmentDto } from './department-dto/update-department.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('departments')
@Controller('departments')
export class DepartmentsController {
  constructor(private departmentsService: DepartmentsService) {}

  @Post()
   createDepartment(
    @Body() createDepartmentDto: CreateDepartmentDto,
  ):Promise<Departments> {
    return this.departmentsService.createDepartment(createDepartmentDto);
  }

  @Get()
   getAllDepartments(): Promise<Departments[]> {
    return this.departmentsService.getAllDepartments();
  }

  @Put(':id')
   updateDepartment(@Param('id') id: number, @Body() updateDepartmentDto: UpdateDepartmentDto) {
    return this.departmentsService.updateDepartment(id, updateDepartmentDto);
  }

  @Get(':id')
   getDepartment(@Param('id') id: number): Promise<Departments> {
    return this.departmentsService.getSingleDepartment(id);
  }

  @Delete(':id')
   deleteDepartment(@Param('id') id: number): Promise<string> {
    return this.departmentsService.deleteDepartment(id);
  }

  @Get('department-students/:id')
   getDepartmentStudents(@Param('id') id: number):Promise<any> {
    return this.departmentsService.getDepartmentStudents(id);
  }

}
