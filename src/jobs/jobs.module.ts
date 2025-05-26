// src/jobs/jobs.module.ts
import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { ProductProcessor } from './product.processor';

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'product-queue',
      redis: {
        host: process.env.REDIS_HOST ?? 'localhost',
        port: parseInt(process.env.REDIS_PORT ?? '6379'),
      },
    }),
  ],
  providers: [ProductProcessor],
  exports: [],
})
export class JobsModule {}
