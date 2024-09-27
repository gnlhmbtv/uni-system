import { Column, ForeignKey, Model, Table, DataType } from 'sequelize-typescript';
import { Students } from '../students/students.model'; // Adjust the path as needed
import { Courses } from '../courses/courses.model'; // Adjust the path as needed

@Table({
  tableName: 'studentCourses', // Optional: If you want to explicitly define the table name
  timestamps: true,     // Optional: Disable createdAt and updatedAt columns if not needed
})
export class StudentCourses extends Model<StudentCourses> {
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
}
