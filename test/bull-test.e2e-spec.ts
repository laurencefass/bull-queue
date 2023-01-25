import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { ExampleBullModule } from '../src/batch/batch-queue.module';

describe('BullExample (e2e)', () => {
  let app: INestApplication;
  const PATHROOT = '/example-bull';

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [ExampleBullModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  describe('GET /example-bull', () => {
    describe('/test (GET)', () => {
      fit('Fails to respond', async () => {
        await request(app.getHttpServer())
          .get(`${PATHROOT}/test`)
          .timeout(1000)
          .expect('foo');
      });
      it('Returns a 200 code and foo)', () => {
        return request(app.getHttpServer())
          .get(`${PATHROOT}/test`)
          .expect(200)
          .expect('foo');
      });
    });
  });
});
