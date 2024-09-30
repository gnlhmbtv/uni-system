import { Column, DataType, ForeignKey, Model, Table, BelongsToMany, HasMany, BelongsTo } from 'sequelize-typescript';
import { Departments } from '../departments/departments.model';
import { Courses } from '../courses/courses.model';
import { StudentCourses } from '../student-courses/student-courses.model';
import { Col } from 'sequelize/types/utils'; // Adjust the path according to your project structure

@Table
export class Users extends Model<Users> {
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  fullName: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  email: string;

  @ForeignKey(() => Departments)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  departmentId: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  username: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  password: string;

  @Column({
    type:DataType.BOOLEAN,
    allowNull: false,
    defaultValue: 1,
  })
  state: number;

  @BelongsToMany(() => Courses, () => StudentCourses)
  courses: Courses[];

  @BelongsTo(() => Departments)
  department: Departments;

}