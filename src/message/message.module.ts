import { Module } from '@nestjs/common';
import { MessageService } from './message.service';
import { MessageController } from './message.controller';
import { MessageEntity } from './entities/message.entity';
import { TypeOrmModule } from '@nestjs/typeorm/dist';
import { ChannelEntity } from '../channel/entities/channel.entity';

@Module({
  imports: [TypeOrmModule.forFeature([MessageEntity, ChannelEntity])],
  controllers: [MessageController],
  providers: [MessageService],
})
export class MessageModule {}
