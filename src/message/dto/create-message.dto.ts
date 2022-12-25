import { ApiProperty } from '@nestjs/swagger/dist/decorators/api-property.decorator';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateMessageDto {
  @ApiProperty({ description: 'a message title', example: 'hello' })
  @IsNotEmpty({ message: 'The message title is not empty' })
  title: string;
  @ApiProperty({ description: 'a message content', example: 'hello world' })
  @IsNotEmpty({ message: 'The message content is not empty' })
  content: string;
  @ApiProperty({ description: 'a message channel', example: '1' })
  @IsNotEmpty({ message: 'The channel Id is not empty' })
  @IsNumber()
  channel: number;
}
