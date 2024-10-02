import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {SequelizeModule} from "@nestjs/sequelize";
import { DepartmentsModule } from './departments/departments.module';
import { DepartmentsController } from './departments/departments.controller';
import { DepartmentsService } from './departments/departments.service';
import { Departments } from './departments/departments.model';
import { StudentsModule } from './students/students.module';
import { Students } from './students/students.model';
import { Courses } from './courses/courses.model';
import { CoursesModule } from './courses/courses.module';
import { StudentCourses } from './student-courses/student-courses.model';
import { StudentCoursesModule } from './student-courses/student-courses.module';
//import { initModels } from './initModels';

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'mysql',
      host: 'localhost',        // Your MySQL server's address
      port: 3306,               // Default MySQL port
      username: 'root',         // Your MySQL username
      password: 'admin',     // Your MySQL password
      database: 'unidb', // Your database name
      autoLoadModels: true,     // Automatically load models
      synchronize: true,
    }),
    DepartmentsModule,
    StudentsModule,
    CoursesModule,
    StudentCoursesModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(){
  }
}
