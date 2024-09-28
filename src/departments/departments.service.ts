import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Departments } from './departments.model';
import { Model } from 'sequelize-typescript';
import { CreateDepartmentDto } from './department-dto/create-department.dto';
import { UpdateDepartmentDto } from './department-dto/update-department.dto';
import { where } from 'sequelize';

@Injectable()
export class DepartmentsService {
  constructor(
    @InjectModel(Departments)
    private departmentModel: typeof Departments,
  ) {}

  //Create Department
  async createDepartment(createDepartmentDto: CreateDepartmentDto): Promise<Departments> {
    return this.departmentModel.create(createDepartmentDto);
  }

  //Get all Department
  async getAllDepartments(): Promise<Departments[]> {
    return await this.departmentModel.findAll({
      where: { state:1}
    });
  }

  //Update Department
  async updateDepartment(id: number, updateDepartmentDto: UpdateDepartmentDto): Promise<Departments> {
    const department = await this.departmentModel.findByPk(id);
    if (!department) {
      throw new NotFoundException('Department not found');
    }
    return department.update(updateDepartmentDto);
  }

  //Get single department
  async getSingleDepartment(id: number): Promise<Departments> {
    return await this.departmentModel.findByPk(id);
  }

  //Delete department
  async deleteDepartment(id: number): Promise<string> {
    const department = await this.departmentModel.findByPk(id);
    if (!department) {
      throw new NotFoundException('Department not found');
    }
    department.state = 0;
    await department.save();
      return `Department with ID ${id} has been deleted (soft delete).`;
  }
}
