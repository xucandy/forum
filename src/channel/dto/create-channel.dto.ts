import { ApiProperty } from '@nestjs/swagger/dist/decorators';
import { IsNotEmpty, MaxLength } from 'class-validator';
export class CreateChannelDto {
  @ApiProperty({ description: 'a channel name', example: 'channel' })
  @IsNotEmpty({ message: 'channel name is not empty' })
  @MaxLength(30, {
    message: 'the length of channel name is between 1 and 30',
  })
  name: string;
}
