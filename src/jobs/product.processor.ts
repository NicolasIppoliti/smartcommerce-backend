import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';

@Processor('product-queue')
export class ProductProcessor {
  @Process('update-price')
  handlePriceUpdate(job: Job<{ productId: number; newPrice: number }>) {
    const { productId, newPrice } = job.data;
    console.log(
      `Procesando update de precio: ID=${productId}, nuevo=${newPrice}`,
    );
    // Lógica real: actualizar producto en DB
  }
}
