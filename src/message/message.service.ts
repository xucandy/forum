import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm/dist/common';
import { ChannelEntity } from '../channel/entities/channel.entity';
import { Repository } from 'typeorm';
import { CreateMessageDto } from './dto/create-message.dto';
import { MessageEntity } from './entities/message.entity';

@Injectable()
export class MessageService {
  constructor(
    @InjectRepository(ChannelEntity)
    private readonly channelRepository: Repository<ChannelEntity>,
    @InjectRepository(MessageEntity)
    private readonly messageRepository: Repository<MessageEntity>,
  ) {}

  /**
   * @description create a message into a channel
   * @param createMessageDto
   * {
   *   "title":"m1",
   *   "content":"m1",
   *   "channel":1
   * }
   * @returns return a created message json data
   */
  async create(createMessageDto: CreateMessageDto) {
    const { title } = createMessageDto;
    const message = await this.messageRepository.findOne({
      where: { title },
    });
    if (message) {
      throw new HttpException(`the message title:${title} already exists`, 803);
    }
    const channel = await this.channelRepository.findOne({
      where: { id: createMessageDto.channel },
    });
    if (!channel) {
      throw new HttpException(
        `The channel id:${createMessageDto.channel} doesn't exists`,
        802,
      );
    }
    return this.messageRepository.save({ ...createMessageDto, channel });
  }
  /**
   * @description get a message
   * @param id  message id
   * @returns  return a  message json data
   */
  async findAll(query) {
    const { pageNum = 1, pageSize = 2, channel } = query;
    if (isNaN(pageNum) || isNaN(pageSize) || isNaN(channel)) {
      throw new HttpException('the param is not number', 805);
    }
    const messageQuery = await this.messageRepository
      .createQueryBuilder('message')
      .innerJoinAndSelect('message.channel', 'channel')
      .where('channel.id', { id: channel })
      .orderBy('message.createAt', 'DESC')
      .skip((pageNum - 1) * pageSize)
      .take(pageSize);
    const list = await messageQuery.getMany();
    const count = await messageQuery.getCount();
    return {
      list,
      count,
    };
  }
  /**
   * @description get a message
   * @param id  message id
   * @returns  return a  message json data
   */
  async findOne(id: number): Promise<MessageEntity> {
    return await this.messageRepository.findOne({ where: { id } });
  }

  /**
   * @description delete a message
   * @param id  message id
   * @returns  return a deleted message json data
   */
  async remove(id: number) {
    const existMessage = await this.messageRepository.findOne({
      where: { id },
    });
    if (!existMessage) {
      throw new HttpException(`the message id:${id} doesn't exist`, 804);
    }
    return await this.messageRepository.remove(existMessage);
  }
}
