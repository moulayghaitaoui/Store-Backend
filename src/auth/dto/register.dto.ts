import { IsEmail, IsNotEmpty, MinLength ,IsIn, IsOptional} from 'class-validator';

export class RegisterDto {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @MinLength(6)
  password: string;

   @IsOptional()
  @IsIn(['USER', 'OWNER'])
  role?: 'USER' | 'OWNER'; 
  // optional: allow client to set role? For test, default USER in Prisma
}



