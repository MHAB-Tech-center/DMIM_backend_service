import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateSystemFeatureDTO {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;
}
