import { Type } from 'class-transformer';
import { IsNotEmpty, IsInt } from 'class-validator';

export class CreateOrderDetailDto {
  @IsNotEmpty()
  @IsInt()
  @Type(() => Number)
  quantity: number;

  @IsNotEmpty()
  @IsInt()
  @Type(() => Number)
  order_id: number;

  @IsNotEmpty()
  @IsInt()
  @Type(() => Number)
  product_id: number;
}
