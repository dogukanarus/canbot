import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class FilterDto {
  @ApiProperty({ type: String, description: 'Status' })
  @IsOptional()
  @IsString()
  status?: string;
}
