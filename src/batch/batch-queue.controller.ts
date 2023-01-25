import { Get, Controller } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

@Controller('batch')
export class BatchQueueController {
  constructor(@InjectQueue('batch-queue') private readonly batchQueue: Queue) {}

  @Get('test')
  async test() {
    console.log('/test endpoint reached');

    const max = 10000;
    for (let i = 0; i < max; i++) {
      const item = {
        first: i === 0,
        last: i === max - 1,
        id: i,
      };
      // console.log('adding item to queue', item);
      await this.batchQueue.add(item);
    }
    return 'item added to batchQueue ' + Date.now();
  }
}
