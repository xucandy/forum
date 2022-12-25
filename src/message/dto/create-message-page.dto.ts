import { IsNotEmpty, IsNumber, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger/dist/decorators/api-property.decorator';
export class CreateMessagePageDto {
  @ApiProperty({ description: 'page number', example: 1 })
  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  readonly pageNum: number;
  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  @ApiProperty({ description: 'page size', example: 2 })
  readonly pageSize: number;
  @ApiProperty({ description: 'channel id', example: 1 })
  @IsNotEmpty({ message: 'The channel Id is not empty' })
  @IsNumber()
  @Type(() => Number)
  readonly channel: number;
}
