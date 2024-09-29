import { Column, ForeignKey, Model, Table, DataType, BelongsTo } from 'sequelize-typescript';
import { Students } from '../students/students.model'; // Adjust the path as needed
import { Courses } from '../courses/courses.model'; // Adjust the path as needed

@Table
export class StudentCourses extends Model<StudentCourses> {
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;

  @ForeignKey(() => Students)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  studentId: number;

  @ForeignKey(() => Courses)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  courseId: number;

  @Column({
    type:DataType.BOOLEAN,
    allowNull: false,
    defaultValue: 1,
  })
  state: number;

  @BelongsTo(() => Students, 'studentId')
  student: Students;

  @BelongsTo(() => Courses, 'courseId')
  course: Courses;

}
