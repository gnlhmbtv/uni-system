import { Column, DataType, Model, Table } from 'sequelize-typescript';

@Table({
  tableName: 'courses', // Optional: If you want to explicitly define the table name
  timestamps: true,     // Optional: Disable createdAt and updatedAt columns if not needed
})

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
}