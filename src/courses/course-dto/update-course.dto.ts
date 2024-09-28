import { PartialType } from '@nestjs/mapped-types';
import { CreateDepartmentDto } from '../../departments/department-dto/create-department.dto';

export class UpdateCourseDto extends PartialType(CreateDepartmentDto) {}
