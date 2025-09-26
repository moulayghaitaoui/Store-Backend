import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { PrismaService } from '../prisma/prisma.service';
import { JwtStrategy } from '../common/jwt.strategy';
import { ProductsRepository } from './products.repository';

@Module({
  controllers: [ProductsController],
  providers: [ProductsService, PrismaService, JwtStrategy,ProductsRepository],
})
export class ProductsModule {}
