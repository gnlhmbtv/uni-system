import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';
import { Students } from '../students/students.model';

@Table

export class Departments extends Model<Departments> {
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
  name: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  faculty: string;

  @Column({
    type:DataType.BOOLEAN,
    allowNull: false,
    defaultValue: 1,
  })
  state: number;

  @HasMany(() => Students)
  students: Students[];
}