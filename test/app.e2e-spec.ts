import { Test, TestingModule } from '@nestjs/testing';
import request from 'supertest';
import { AppModule } from './../src/app.module';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';

describe('AppController (e2e)', () => {
  let app: NestFastifyApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication<NestFastifyApplication>(
      new FastifyAdapter(),
    );
    await app.init();
    await app.getHttpAdapter().getInstance().ready();
  });

  it('/user/id (GET)', async () => {
    const res = await request(app.getHttpServer())
      .get('/user/1')
      .expect(200);

    expect(res.body).toHaveProperty('id');
  });
  it('/user/id (GET)', async () => {
    const res = await request(app.getHttpServer())
      .get('/user/а');

    expect(res.status).toBe(400);
  });

  afterAll(async () => {
    await app.close();
  });
});
