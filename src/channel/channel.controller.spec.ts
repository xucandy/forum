import { Test, TestingModule } from '@nestjs/testing';
import { database } from 'src/config/database.config';
import { ChannelController } from './channel.controller';
import { ChannelService } from './channel.service';

const responseMock = (dto, id?) => {
  const data = dto || { name: 'channel' };
  return {
    data: {
      id: id || expect.any(Number),
      ...data,
    },
    code: 200,
    message: 'success',
  };
};
describe('ChannelController', () => {
  let controller: ChannelController;
  const mockChannelService = {
    create: jest.fn((dto) => responseMock(dto)),
    update: jest.fn((id, dto) => responseMock(dto, id)),
    findOne: jest.fn((id) => responseMock(id)),
  };
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ChannelController],
      providers: [ChannelService],
    })
      .overrideProvider(ChannelService)
      .useValue(mockChannelService)
      .compile();

    controller = module.get<ChannelController>(ChannelController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a channel', () => {
    const dto = { name: 'channel' };
    expect(controller.createChannel(dto)).toEqual(responseMock(dto));
    expect(mockChannelService.create).toHaveBeenCalled();
  });
  it('should update a channel', () => {
    const dto = { name: 'channel' };
    expect(controller.updateChannelById(1, dto)).toEqual(responseMock(dto, 1));
    expect(mockChannelService.update).toHaveBeenCalled();
  });
  it('should find a channel', () => {
    expect(controller.findOneChannel(1)).toEqual(responseMock(1));
    expect(mockChannelService.findOne).toHaveBeenCalled();
  });
});
