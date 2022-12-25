import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm/dist';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ChannelModule } from './channel/channel.module';
import { database } from './config/database.config';
import { MessageModule } from './message/message.module';

@Module({
  imports: [TypeOrmModule.forRoot(database()), ChannelModule, MessageModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
