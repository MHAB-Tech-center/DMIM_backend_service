import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsNotEmpty, IsUUID } from 'class-validator';
import { UUID } from 'crypto';

export class CreateInspectionPlanDTO {
  @ApiProperty()
  @IsNotEmpty()
  @IsUUID()
  minesiteId: UUID;
  @ApiProperty()
  @IsNotEmpty()
  startDate: Date;
  @ApiProperty()
  @IsNotEmpty()
  endDate: Date;
}
