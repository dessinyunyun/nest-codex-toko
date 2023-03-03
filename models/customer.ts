import {
  Model,
  Table,
  Column,
  DataType,
  Index,
  Sequelize,
  ForeignKey,
  HasOne,
} from 'sequelize-typescript';
import { user } from './user';

export interface customerAttributes {
  id?: number;
  firstname?: string;
  lastname?: string;
  user_id?: number;
  createdat?: Date;
  updatedat?: Date;
}

@Table({ tableName: 'customer', schema: 'public', timestamps: false })
export class customer
  extends Model<customerAttributes, customerAttributes>
  implements customerAttributes
{
  @Column({
    primaryKey: true,
    autoIncrement: true,
    type: DataType.INTEGER,
    defaultValue: Sequelize.literal("nextval('customer_id_seq'::regclass)"),
  })
  @Index({ name: 'customer_pkey', using: 'btree', unique: true })
  id?: number;

  @Column({ allowNull: true, type: DataType.STRING(100) })
  firstname?: string;

  @Column({ allowNull: true, type: DataType.STRING(100) })
  lastname?: string;

  @Column({ allowNull: true, type: DataType.INTEGER })
  @Index({ name: 'customer_user_id_key', using: 'btree', unique: true })
  user_id?: number;

  @Column({
    allowNull: true,
    type: DataType.DATE(6),
    defaultValue: Sequelize.literal('now()'),
  })
  createdat?: Date;

  @Column({
    allowNull: true,
    type: DataType.DATE(6),
    defaultValue: Sequelize.literal('now()'),
  })
  updatedat?: Date;

  @HasOne(() => user, { sourceKey: 'user_id' })
  user?: user;
}
