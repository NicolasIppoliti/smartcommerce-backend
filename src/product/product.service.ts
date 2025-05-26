import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult, DeleteResult } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './product.entity';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product) private readonly repo: Repository<Product>,
    @InjectQueue('product-queue') private readonly productQueue: Queue,
  ) {}

  findAll(): Promise<Product[]> {
    return this.repo.find();
  }

  findOne(id: number): Promise<Product | null> {
    return this.repo.findOneBy({ id });
  }

  create(dto: CreateProductDto): Promise<Product> {
    const p = this.repo.create(dto);
    return this.repo.save(p);
  }

  update(id: number, dto: UpdateProductDto): Promise<UpdateResult> {
    return this.repo.update(id, dto);
  }

  delete(id: number): Promise<DeleteResult> {
    return this.repo.delete(id);
  }

  async enqueuePriceUpdate(productId: number, newPrice: number): Promise<void> {
    await this.productQueue.add('update-price', { productId, newPrice });
  }
}
