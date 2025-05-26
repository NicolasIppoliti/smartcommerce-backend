import { Test, TestingModule } from '@nestjs/testing';
import { ProductProcessor } from './product.processor';

describe('ProductProcessor', () => {
  let provider: ProductProcessor;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductProcessor],
    }).compile();

    provider = module.get<ProductProcessor>(ProductProcessor);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
