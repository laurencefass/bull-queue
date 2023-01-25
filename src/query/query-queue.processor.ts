import { Injectable } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
import { Processor, Process } from '@nestjs/bull';
import { Job } from 'bull';

@Injectable()
@Processor('query-queue')
export class QueryQueueProcessor {
  start: number;

  constructor(
    // @InjectQueue('query-queue') private readonly queryQueue: Queue,
    @InjectQueue('batch-queue') private readonly batchQueue: Queue,
  ) {
    this.start = 0;
  }

  @Process({ name: 'process:run-batch', concurrency: 10 })
  async handleJob(job: Job) {
    const max = job.data.count;
    for (let i = 0; i < max; i++) {
      const item = {
        duration: job.data.duration,
        first: i === 0,
        last: i === max - 1,
        id: i + 1,
      };
      // console.log('adding item to queue', item);
      await this.batchQueue.add(item, {
        // await this.batchQueue.add('process:add-item', item, {
        attempts: 3,
        // if an import fails, attempt again in 10 minutes
        backoff: {
          type: 'fixed',
          delay: 1000 * 60 * 10,
        },
        removeOnComplete: 1000,
        removeOnFail: 1000,
      });
    }
  }
}
