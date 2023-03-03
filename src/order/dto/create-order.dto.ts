import { Type } from 'class-transformer';
import { IsNotEmpty, IsInt } from 'class-validator';

export class CreateOrderDto {
  @IsNotEmpty()
  @IsInt()
  @Type(() => Number)
  totalproduct: number;

  @IsNotEmpty()
  totalprice: string;

  @IsInt()
  @Type(() => Number)
  @IsNotEmpty()
  user_id: number;
}
