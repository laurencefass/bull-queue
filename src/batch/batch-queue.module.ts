import { BullModule, InjectQueue } from '@nestjs/bull';
import { Module, OnApplicationBootstrap } from '@nestjs/common';
import { Queue } from 'bull';
import { BatchQueueProcessor } from './batch-queue.processor';
import { BatchQueueController } from './batch-queue.controller';
import { join } from 'path';

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'batch-queue',
      processors: [join(__dirname, 'processor.js')],
    }),
  ],
  controllers: [BatchQueueController],
  // providers: [BatchQueueProcessor],
})
export class BatchQueueModule implements OnApplicationBootstrap {
  constructor(@InjectQueue('batch-queue') private fooQueue: Queue) {}

  onApplicationBootstrap() {
    return;
  }
}
