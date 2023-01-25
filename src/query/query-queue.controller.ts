import { Get, Controller, Param } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';

@Controller('batch')
export class QueryQueueController {
  constructor(@InjectQueue('query-queue') private readonly queryQueue: Queue) {}

  @Get(':count/:duration')
  async test(@Param() params) {
    console.log(
      'batch controller, count = ',
      params.count,
      'duration = ',
      params.duration,
      'process.id',
      process.pid,
    );
    await this.queryQueue.add('process:run-batch', {
      count: params.count,
      duration: params.duration,
    });
    return 'initiated batch query ' + Date.now();
  }
}
