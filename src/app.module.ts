import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { BatchQueueModule } from './batch/batch-queue.module';
import { QueryQueueModule } from './query/query-queue.module';

@Module({
  imports: [
    BullModule.forRoot({
      redis: {
        host: 'localhost',
        port: 6379,
      },
    }),
    BatchQueueModule,
    QueryQueueModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
