import { Column, DataType, ForeignKey, Model, Table, BelongsToMany, HasMany, BelongsTo } from 'sequelize-typescript';
import { Departments } from '../departments/departments.model';
import { Courses } from '../courses/courses.model';
import { StudentCourses } from '../student-courses/student-courses.model'; // Adjust the path according to your project structure

@Table
export class Students extends Model<Students> {
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
    type:DataType.BOOLEAN,
    allowNull: false,
    defaultValue: 1,
  })
  state: number;

  @BelongsToMany(() => Courses, () => StudentCourses) // Association to StudentCourses
  courses: Courses[];

  @BelongsTo(() => Departments)
  department: Departments;

}