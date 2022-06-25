import {
  AllowNull,
  Column,
  DataType,
  Default,
  Sequelize,
  PrimaryKey,
  Table,
  Model,
} from 'sequelize-typescript';

@Table({
  tableName: 'users',
  underscored: true,
  timestamps: false,
})
export default class User extends Model {
  @PrimaryKey
  @Default(Sequelize.literal('DEFAULT'))
  @Column(DataType.UUID)
  public userId!: string;

  @AllowNull(true)
  @Column(DataType.STRING)
  public name!: string | null;

  @AllowNull(true)
  @Column(DataType.STRING)
  public surname!: string | null;

  @AllowNull(true)
  @Column(DataType.STRING)
  public patronymic!: string | null;
}
