import { Test, TestingModule } from '@nestjs/testing';
import { BatchQueueController } from './batch-queue.controller';

describe('ExampleBullController', () => {
  let controller: BatchQueueController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BatchQueueController],
    }).compile();

    controller = module.get<BatchQueueController>(BatchQueueController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
