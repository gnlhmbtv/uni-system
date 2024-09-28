import { BelongsToMany, Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';
import { Students } from '../students/students.model';
import { StudentCourses } from '../student-courses/student-courses.model';

@Table

export class Courses extends Model<Courses> {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
  })
  id: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  description: string;

  @Column({
    type:DataType.BOOLEAN,
    allowNull: false,
    defaultValue: 1,
  })
  state: number;

  @BelongsToMany(() => Students, () => StudentCourses) // Association to StudentCourses
  students: Students[];
}