import {
  Injectable,
  UnauthorizedException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
//import { Role } from '@prisma/client';
//import { PrismaClient, Role } from '@prisma/client';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
type RoleType = 'USER' | 'OWNER';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

async register(email: string, password: string, role: string = 'USER') {
  // التحقق إذا كان البريد موجود بالفعل
  const exists = await this.prisma.user.findUnique({ where: { email } });
  if (exists) throw new BadRequestException('Email already used');

  // تشفير كلمة المرور
  const hashed = await bcrypt.hash(password, 10);

  // تحديد الدور
  const roleEnum: RoleType = role.toUpperCase() === 'OWNER' ? 'OWNER' : 'USER';

  // إنشاء المستخدم
  const user = await this.prisma.user.create({
    data: { email, password: hashed, role: roleEnum },
  });

  // إزالة كلمة المرور من النتيجة
  const { password: _, ...userWithoutPassword } = user;
  return userWithoutPassword;
}



  async validateUser(email: string, pass: string) {
    const user = await this.usersService.findByEmail(email);
    if (user && (await bcrypt.compare(pass, user.password))) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(email: string, password: string) {
    const user = await this.validateUser(email, password);
    if (!user) throw new UnauthorizedException('Invalid credentials');

    const payload = { sub: user.id, role: user.role };
    const accessToken = this.jwtService.sign(payload);

    return {
      accessToken,
      user: { id: user.id, email: user.email, role: user.role },
    };
  }
}
