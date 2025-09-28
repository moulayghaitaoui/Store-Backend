import { Type } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProductsDto {
  @ApiProperty({ example: 'iPhone 15', description: 'اسم المنتج' })
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'أحدث هاتف من آبل', description: 'وصف المنتج' })
  @IsNotEmpty()
  description: string;

  @ApiProperty({ example: 1200, description: 'سعر المنتج' })
  @IsNotEmpty()
  @Type(() => Number)
  price: number;

  @ApiProperty({ example: 'Electronics', description: 'تصنيف المنتج' })
  @IsNotEmpty()
  category: string;
}

export class UpdateProductsDto {
  @ApiProperty({ example: 'iPhone 15 Pro', description: 'اسم المنتج الجديد' })
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'نسخة Pro من iPhone 15', description: 'الوصف الجديد' })
  @IsNotEmpty()
  description: string;

  @ApiProperty({ example: 1500, description: 'السعر الجديد' })
  @IsNotEmpty()
  @Type(() => Number)
  price: number;

  @ApiProperty({ example: 'Electronics', description: 'التصنيف الجديد' })
  @IsNotEmpty()
  category: string;
}
