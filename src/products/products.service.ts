import { Inject, Injectable } from '@nestjs/common';
import { ProductsRepository } from './products.repository';

@Injectable()
export class ProductsService {
  constructor(private productsRepository: ProductsRepository) {}

  async findAll(params: { category?: string; sort?: string }) {
    return this.productsRepository.findAll(params);
  }

  async findOne(id: string) {
    return this.productsRepository.findById(Number(id));
  }

  async create(data: any, ownerId: number) {
    return this.productsRepository.create({ ...data, ownerId });
  }

  async update(id: string, data: any) {
    return this.productsRepository.update(Number(id), data);
  }

  async remove(id: string) {
    return this.productsRepository.delete(Number(id));
  }
}
