import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUUID } from 'class-validator';
import { UUID } from 'crypto';

export class ReviewInspectionPlanDTO {
  @ApiProperty()
  @IsUUID()
  @IsNotEmpty()
  planId: UUID;
  @IsString()
  @ApiProperty()
  @IsNotEmpty()
  reviewMessage: string;
}
