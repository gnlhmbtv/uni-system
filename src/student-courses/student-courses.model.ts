import { Column, ForeignKey, Model, Table, DataType, BelongsTo } from 'sequelize-typescript';
import { Users } from '../users/users.model'; // Adjust the path as needed
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

  @ForeignKey(() => Users)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  userId: number;

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

  @BelongsTo(() => Users, 'userId')
  user: Users;

  @BelongsTo(() => Courses, 'courseId')
  course: Courses;

}
