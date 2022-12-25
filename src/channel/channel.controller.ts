import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger/dist';
import { ApiParam } from '@nestjs/swagger/dist/decorators/api-param.decorator';
import { ApiResponse } from '@nestjs/swagger/dist/decorators/api-response.decorator';
import { ChannelService } from './channel.service';
import { CreateChannelDto } from './dto/create-channel.dto';
import { UpdateChannelDto } from './dto/update-channel.dto';

@ApiTags('Channels')
@Controller('channel')
export class ChannelController {
  constructor(private readonly channelService: ChannelService) {}

  /**
   * @description create  a new channel
   * @param       createChannelDto
   * {
   *   "name":"xxx"
   * }
   * @returns     one created channel json data
   */
  @Post()
  @ApiOperation({ summary: 'create a channel' })
  @ApiBody({ type: CreateChannelDto, description: 'input name' })
  @ApiResponse({
    status: 200,
    description: 'return a channel json data',
    type: CreateChannelDto,
  })
  createChannel(@Body() createChannelDto: CreateChannelDto) {
    return this.channelService.create(createChannelDto);
  }

  /**
   * @description  get all channels
   * @returns      all channels json data
   */
  @Get()
  @ApiOperation({ summary: 'get all channels' })
  findAllChannel() {
    return this.channelService.findAll();
  }

  /**
   * @description  get one channel by id
   * @returns      one channeljson data
   */
  @ApiOperation({ summary: 'get a channel' })
  @ApiParam({ name: 'id' })
  @Get(':id')
  findOneChannel(@Param('id', new ParseIntPipe()) id: number) {
    return this.channelService.findOne(id);
  }
  /**
   * @description update a channel
   * @param id    channel id:number
   * @param updateChannelDto
   * @returns  return a updated channel json data
   */
  @ApiOperation({ summary: 'patch a channel' })
  @ApiParam({ name: 'id' })
  @ApiBody({ type: CreateChannelDto, description: 'input name' })
  @Patch(':id')
  updateChannelById(
    @Param('id', new ParseIntPipe()) id: number,
    @Body() updateChannelDto: UpdateChannelDto,
  ) {
    return this.channelService.update(id, updateChannelDto);
  }
  @ApiOperation({ summary: 'delete a channel' })
  @ApiParam({ name: 'id' })
  @Delete(':id')
  removeChannelById(@Param('id', new ParseIntPipe()) id: number) {
    return this.channelService.remove(id);
  }
}
