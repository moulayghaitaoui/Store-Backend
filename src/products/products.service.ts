import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ProductsService {
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

  async findOne(id: string) {
    return this.prisma.product.findUnique({
      where: { id: Number(id) }, // تحويل id من string → number
    });
  }

  async create(data: any, ownerId: number) {
    return this.prisma.product.create({
      data: {
        ...data,
        ownerId,
      },
    });
  }

  async update(id: string, data: any) {
    return this.prisma.product.update({
      where: { id: Number(id) },
      data,
    });
  }

  async remove(id: string) {
    return this.prisma.product.delete({
      where: { id: Number(id) },
    });
  }
}
