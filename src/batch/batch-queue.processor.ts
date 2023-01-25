import { Injectable } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
import forkProcess from './processor';

import {
  Processor,
  Process,
  OnQueueActive,
  OnQueueCompleted,
  OnGlobalQueueActive,
  OnQueueWaiting,
} from '@nestjs/bull';
import { Job } from 'bull';

type JobData = {
  id: number;
  duration: number;
  first: boolean;
  last: boolean;
};

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

@Injectable()
@Processor('batch-queue')
export class BatchQueueProcessor {
  start: number;

  constructor(@InjectQueue('batch-queue') private readonly batchQueue: Queue) {
    this.start = 0;
  }

  async process(job: Job<JobData>) {
    console.log(
      'same thread process(), process.pid=',
      process.pid,
      'job.data=',
      job.data,
    );

    await sleep(job.data.duration);

    if (job.data.first === true) {
      console.log('*** processing first item ***', Date.now());
      this.start = Date.now();
    }

    if (job.data.last === true) {
      console.log(
        '*** test run complete, ticks taken ***',
        Date.now() - this.start,
      );
    }
  }

  @Process({ name: 'process:add-item', concurrency: 5 })
  async handleJob(job: Job<JobData>) {
    console.log('handleJob, process.pid=', process.pid);
    await this.process(job);
  }

  @OnGlobalQueueActive()
  onGlobalActive() {
    // console.log(`OnGlobalQueueActive `, this.fooQueue.name);
  }

  @OnQueueActive()
  onActive(job: Job) {
    // console.log(`OnQueueActive. ${job.id}`);
  }

  @OnQueueWaiting()
  onWaiting() {
    // console.log(`OnQueueWaiting`, this.fooQueue.name);
  }

  @OnQueueCompleted()
  OnCompleted(job: Job) {
    console.log(`OnQueueCompleted. ${job.id}`);
  }
}
