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
import { ConfigModule, ConfigService } from '@nestjs/config';
//import { initModels } from './initModels';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Makes the ConfigModule global (no need to import in other modules)
      envFilePath: '.env', // Path to the .env file
    }),
    SequelizeModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        dialect: 'mysql',
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_NAME'),
        autoLoadModels: true,
        synchronize: true,
      })

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
