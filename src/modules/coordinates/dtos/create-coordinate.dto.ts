import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCoordinateDTO {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  utm_east: string;
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  dms_east: string;
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  utm_south: string;
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  dms_south: string;
}
