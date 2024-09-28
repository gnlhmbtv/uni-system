import { Module } from '@nestjs/common';
import { StudentsService } from './students.service';
import { StudentsController } from './students.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Students } from './students.model';

@Module({
  imports: [SequelizeModule.forFeature([Students])],
  providers: [StudentsService],
  controllers: [StudentsController]
})
export class StudentsModule {}
