import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class ProductsRepository {
  constructor(private prisma: PrismaService) {}

  async findAll(params: { category?: string; sort?: string }) {
    const { category, sort } = params;
    const where = category ? { category } : undefined;
    const orderBy = sort ? { price: sort as 'asc' | 'desc' } : undefined;

    return this.prisma.product.findMany({
      where,
      orderBy,
    });
  }

  async findById(id: number) {
    return this.prisma.product.findUnique({
      where: { id },
    });
  }

  async create(data: any) {
    return this.prisma.product.create({
      data,
    });
  }

  async update(id: number, data: any) {
    return this.prisma.product.update({
      where: { id },
      data,
    });
  }

  async delete(id: number) {
    return this.prisma.product.delete({
      where: { id },
    });
  }
}
