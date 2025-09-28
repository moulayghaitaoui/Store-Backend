import { IsEmail, IsNotEmpty, MinLength, IsIn, IsOptional } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class RegisterDto {
  @ApiProperty({ example: 'newuser@example.com', description: 'User email address' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'strongPassword123', description: 'Password (min 6 characters)' })
  @IsNotEmpty()
  @MinLength(6)
  password: string;

  @ApiPropertyOptional({ example: 'OWNER', enum: ['USER', 'OWNER'], description: 'User role (default: USER)' })
  @IsOptional()
  @IsIn(['USER', 'OWNER'])
  role?: 'USER' | 'OWNER'; 
}
