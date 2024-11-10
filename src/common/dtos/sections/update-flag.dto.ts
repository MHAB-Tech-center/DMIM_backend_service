import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateSectionFlagDTO {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  flagStandard: string;
}
