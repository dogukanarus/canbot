import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class PacksDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  @ApiProperty({ type: String, description: 'Pack Name' })
  title: string;

  // @IsNotEmpty()
  // @IsString()
  @ApiProperty({ type: String, description: 'Pack Describe' })
  desc: string;

  @IsNotEmpty()
  @ApiProperty({ type: Number, description: 'Pack Price' })
  price: number;
}
