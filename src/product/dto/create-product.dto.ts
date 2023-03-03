import { Type } from 'class-transformer';
import { IsInt, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateProductDto {
  destroy() {
    throw new Error('Method not implemented.');
  }
  // @IsNotEmpty()
  name: string;

  // @IsNotEmpty()
  description: string;

  // @IsNotEmpty()
  @IsInt()
  @Type(() => Number)
  price: string;

  @IsOptional()
  image: string;

  // @IsNotEmpty()
  category_id: number;
}
