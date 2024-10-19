import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateSectionDTO {
  @ApiProperty()
  @IsString()
  title: string;
}
