import { Job, DoneCallback } from 'bull';
import { Process } from '@nestjs/bull';
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

let start: number;

export default async function (job: Job, cb: DoneCallback) {
  console.log('processor.ts, process.pid=', process.pid, 'job.data=', job.data);

  await sleep(job.data.duration);

  if (job.data.first === true) {
    console.log('*** processing first item ***', Date.now());
    start = Date.now();
  }

  if (job.data.last === true) {
    console.log('*** test run complete, ticks taken ***', Date.now() - start);
  }

  console.log(`[${process.pid}] ${JSON.stringify(job.data)}`);
  cb(null, 'job completed');
}
