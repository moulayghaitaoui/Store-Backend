import { Type } from 'class-transformer';
import { IsEmail, IsNotEmpty, MinLength ,IsIn, IsOptional} from 'class-validator';

export class CreateProductsDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  @Type(() => Number)
  price: number;

  @IsNotEmpty()
  category: string;



  

 
  // optional: allow client to set role? For test, default USER in Prisma
}

export class UpdateProductsDto {
    
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  @Type(() => Number)
  price: number;

  @IsNotEmpty()
  category: string;

}



