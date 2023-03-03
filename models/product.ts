import {
  Model,
  Table,
  Column,
  DataType,
  Index,
  Sequelize,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { product_category } from './product_category';

export interface productAttributes {
  id?: number;
  name?: string;
  description?: string;
  price?: string;
  image?: string;
  category_id?: number;
  createdat?: Date;
  updatedat?: Date;
}

@Table({ tableName: 'product', schema: 'public', timestamps: false })
export class product
  extends Model<productAttributes, productAttributes>
  implements productAttributes
{
  setCategory(newCategory: product) {
    throw new Error('Method not implemented.');
  }
  static createQueryBuilder(): any {
    throw new Error('Method not implemented.');
  }
  static findByIdsInCache(arg0: any, id: number) {
    throw new Error('Method not implemented.');
  }
  @Column({
    primaryKey: true,
    autoIncrement: true,
    type: DataType.INTEGER,
    defaultValue: Sequelize.literal("nextval('product_id_seq'::regclass)"),
  })
  @Index({ name: 'product_pkey', using: 'btree', unique: true })
  id?: number;

  @Column({ allowNull: true, type: DataType.STRING(100) })
  name?: string;

  @Column({ allowNull: true, type: DataType.STRING(200) })
  description?: string;

  @Column({ allowNull: true, type: DataType.DECIMAL })
  price?: string;

  @Column({ allowNull: true, type: DataType.STRING(200) })
  image?: string;

  @ForeignKey(() => product_category)
  @Column({ allowNull: true, type: DataType.INTEGER })
  category_id?: number;

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

  @BelongsTo(() => product_category, { as: 'category' })
  product_category?: product_category;
  static category_id: number;
  static category: product;
}
