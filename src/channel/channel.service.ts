import { HttpException } from '@nestjs/common';
import { Injectable } from '@nestjs/common/decorators';
import { InjectRepository } from '@nestjs/typeorm/dist/common';
import { Repository } from 'typeorm';
import { CreateChannelDto } from './dto/create-channel.dto';
import { UpdateChannelDto } from './dto/update-channel.dto';
import { ChannelEntity } from './entities/channel.entity';

@Injectable()
export class ChannelService {
  constructor(
    @InjectRepository(ChannelEntity)
    private readonly channelRepository: Repository<ChannelEntity>,
  ) {}
  /**
   * @description save a channel entity into database.
   * @param createChannelDto
   * {
   *    "name":"xxxx"
   * }
   * @returns return the created channel json data from database
   */
  async create(createChannelDto: CreateChannelDto) {
    const { name } = createChannelDto;

    const channel = await this.channelRepository.findOne({ where: { name } });
    //check the channel name exists or not
    if (channel) {
      throw new HttpException(`The channel name already exists ${name}}`, 801);
    }
    return await this.channelRepository.save(createChannelDto);
  }
  /**
   * @description get all channels
   * @returns  return all channels json data from database
   */
  async findAll() {
    return await this.channelRepository.find({ order: { id: 'ASC' } });
  }
  /**
   * @description get a channel
   * @param id  channel id
   * @returns  return a channel json data
   */
  async findOne(id: number): Promise<ChannelEntity> {
    return await this.channelRepository.findOne({ where: { id } });
  }

  /**
   * @description update a channel
   * @param id  channel id
   * @param updateChannelDto
   * {
   *   "name":"xxxx"
   * }
   * @returns  return on updated channel json data
   */
  async update(id: number, updateChannelDto: UpdateChannelDto) {
    const existChannel = await this.channelRepository.findOne({
      where: { id },
    });
    // check channel id exists or not
    if (!existChannel) {
      throw new HttpException(`the channel id:${id} doesn't exists`, 802);
    }
    const { name } = updateChannelDto;
    const existChannelName = await this.channelRepository.findOne({
      where: { name },
    });
    // check channel name exists or not
    if (existChannelName) {
      throw new HttpException(`the channel name already exists ${name}}`, 801);
    }
    const updateChannel = this.channelRepository.merge(
      existChannel,
      updateChannelDto,
    );
    return this.channelRepository.save(updateChannel);
  }

  /**
   * @description delete a channel
   * @param id  channel id
   * @returns return a deleted channel json data
   */
  async remove(id: number) {
    const existChannel = await this.channelRepository.findOne({
      where: { id },
    });
    if (!existChannel) {
      throw new HttpException(`The channel id:${id} doesn't exists`, 802);
    }
    return await this.channelRepository.remove(existChannel);
  }
}
