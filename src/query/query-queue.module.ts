import { BullModule, InjectQueue } from '@nestjs/bull';
import { Module, OnApplicationBootstrap } from '@nestjs/common';
import { Queue } from 'bull';
import { QueryQueueProcessor } from './query-queue.processor';
import { QueryQueueController } from './query-queue.controller';

@Module({
  imports: [
    BullModule.registerQueue(
      {
        name: 'query-queue',
      },
      {
        name: 'batch-queue',
      },
    ),
  ],
  controllers: [QueryQueueController],
  providers: [QueryQueueProcessor],
})
export class QueryQueueModule implements OnApplicationBootstrap {
  constructor(@InjectQueue('query-queue') private barQueue: Queue) {}
  onApplicationBootstrap() {
    return;
  }
}
