import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  ParseIntPipe,
} from '@nestjs/common';
import { MessageService } from './message.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { CreateMessagePageDto } from './dto/create-message-page.dto';
import { ApiTags } from '@nestjs/swagger/dist/decorators/api-use-tags.decorator';
import { ApiOperation } from '@nestjs/swagger/dist/decorators/api-operation.decorator';
import { ApiBody } from '@nestjs/swagger/dist/decorators/api-body.decorator';
import { ApiResponse } from '@nestjs/swagger/dist/decorators/api-response.decorator';
import { ApiParam } from '@nestjs/swagger/dist/decorators/api-param.decorator';
import { ApiQuery } from '@nestjs/swagger/dist/decorators/api-query.decorator';
@ApiTags('Messages')
@Controller('message')
export class MessageController {
  constructor(private readonly messageService: MessageService) {}
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
  @ApiOperation({ summary: 'create a message' })
  @ApiBody({
    type: CreateMessageDto,
    description: 'input title,content,channel',
  })
  @ApiResponse({
    status: 200,
    description: 'return a message json data',
  })
  @Post()
  create(@Body() createMessageDto: CreateMessageDto) {
    return this.messageService.create(createMessageDto);
  }

  /**
   * @description get a message
   * @param id  message id
   * @returns  return a  message json data
   */
  @ApiOperation({ summary: 'get all messages by channel' })
  @ApiQuery({ name: 'pageNum' })
  @ApiQuery({ name: 'pageSize' })
  @ApiQuery({ name: 'channel', required: true })
  @Get()
  findAllMessagesByChannel(@Query() query: CreateMessagePageDto) {
    return this.messageService.findAll(query);
  }
  /**
   * @description get a message
   * @param id  message id
   * @returns  return a  message json data
   */
  @ApiOperation({ summary: 'get a message by message id' })
  @ApiParam({ name: 'id' })
  @Get(':id')
  findOne(@Param('id', new ParseIntPipe()) id: number) {
    return this.messageService.findOne(id);
  }
  /**
   * @description delete a message
   * @param id  message id
   * @returns  return a deleted message json data
   */
  @ApiOperation({ summary: 'delete a message by message id' })
  @ApiParam({ name: 'id' })
  @Delete(':id')
  remove(@Param('id', new ParseIntPipe()) id: number) {
    return this.messageService.remove(id);
  }
}
