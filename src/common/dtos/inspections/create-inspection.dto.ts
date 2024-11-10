import { UUID } from 'crypto';
import { CreateRecordDTO } from './create-record.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsUUID, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { InspectionIdentificationDTO } from './inspection-identification.dto';
import { SummaryReportDTO } from './summary-report.dto';

export class CreateInspectionDTO {
  @ApiProperty()
  @IsNotEmpty()
  identification: InspectionIdentificationDTO;
  @ApiProperty({ type: [CreateRecordDTO] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateRecordDTO)
  records: CreateRecordDTO[];
  @ApiProperty()
  @IsUUID()
  @IsNotEmpty()
  inspectionPlanId: UUID;
  @IsNotEmpty()
  @ApiProperty()
  summaryReport: SummaryReportDTO;
}
