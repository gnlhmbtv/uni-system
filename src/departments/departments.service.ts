import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Departments } from './departments.model';
import { CreateDepartmentDto } from './department-dto/create-department.dto';
import { UpdateDepartmentDto } from './department-dto/update-department.dto';
import { Users } from '../users/users.model';

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

  //Get department students
  async getDepartmentStudents(id:number): Promise<any> {
    const department = await this.departmentModel.findOne({
      where: { id, state:1 },
      include: {
        model: Users,
        attributes: ['id', 'fullName', 'email'],
        where: { state:1 },
      }
    })
    if (!department || !department.users.length) {
      throw new NotFoundException('There is no registered student to this department');
    }
    console.log(department.users);
    return department.users.map((user) => ({
      userId: user.id,
      fullName: user.fullName,
      email: user.email
    }));
  }
}
