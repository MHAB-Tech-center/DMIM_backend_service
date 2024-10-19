import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUUID } from 'class-validator';
import { UUID } from 'crypto';

export class CreateCategoryDTO {
  @IsString()
  @ApiProperty()
  @IsNotEmpty()
  title: string;
  @IsUUID()
  @ApiProperty()
  @IsNotEmpty()
  sectionId: UUID;
}
