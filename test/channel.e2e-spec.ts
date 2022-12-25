import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { ChannelModule } from '../src/channel/channel.module';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ChannelEntity } from '../src/channel/entities/channel.entity';

describe('ChannelController (e2e)', () => {
  let app: INestApplication;
  const mockChanels = {
    data: [{ id: 1, name: 'channel1' }],
    code: 200,
    message: 'success',
  };
  const mockChannelRepository = {
    find: jest.fn().mockResolvedValue(mockChanels),
  };
  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [ChannelModule],
    })
      .overrideProvider(getRepositoryToken(ChannelEntity))
      .useValue(mockChannelRepository)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/channel (GET)', () => {
    return request(app.getHttpServer())
      .get('/channel')
      .expect(200)
      .expect(mockChanels);
  });
});
