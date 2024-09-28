import { Module } from '@nestjs/common';
import { DepartmentsService } from './departments.service';
import { DepartmentsController } from './departments.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Departments } from './departments.model';

@Module({
  imports: [SequelizeModule.forFeature([Departments])],
  providers: [DepartmentsService],
  controllers: [DepartmentsController]
})
export class DepartmentsModule {}
