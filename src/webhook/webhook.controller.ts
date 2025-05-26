import { Controller, Post, Body } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
import { PriceWebhookDto } from './dto/price-webhook.dto';

@Controller('webhooks')
export class WebhookController {
  constructor(
    @InjectQueue('product-queue') private readonly productQueue: Queue,
  ) {}

  @Post('tiendanube')
  async handleWebhook(
    @Body() dto: PriceWebhookDto,
  ): Promise<{ status: string }> {
    await this.productQueue.add('update-price', {
      productId: dto.productId,
      newPrice: dto.newPrice,
    });
    return { status: 'queued' };
  }
}
