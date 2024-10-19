import { UUID } from 'crypto';
import { CreateRecordDTO } from './create-record.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsUUID, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateInspectionDTO {
  @ApiProperty({ type: [CreateRecordDTO] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateRecordDTO)
  records: CreateRecordDTO[];
  @ApiProperty()
  @IsUUID()
  @IsNotEmpty()
  inspectionPlanId: UUID;
}
