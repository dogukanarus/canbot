import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class SignUpDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  @ApiProperty({ type: String, description: 'Name' })
  name: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  @ApiProperty({ type: String, description: 'Surname' })
  surname: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  @ApiProperty({ type: String, description: 'Father Name' })
  fathername: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  @ApiProperty({ type: String, description: 'Phone' })
  phone: string;

  @ApiProperty({ type: String, description: 'Refferance' })
  ref: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  @ApiProperty({ type: String, description: 'Password' })
  password: string;
}
