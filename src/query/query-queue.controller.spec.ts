import { Test, TestingModule } from '@nestjs/testing';
import { QueryQueueController } from './query-queue.controller';

describe('ExampleBullController', () => {
  let controller: QueryQueueController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [QueryQueueController],
    }).compile();

    controller = module.get<QueryQueueController>(QueryQueueController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
