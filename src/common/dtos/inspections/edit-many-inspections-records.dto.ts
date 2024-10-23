import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, ValidateNested } from 'class-validator';
import { EditInspectionRecordDTO } from './edit-inspection.dto';

export class EditManyInspectionRecordsDTO {
  @ApiProperty({ type: [EditInspectionRecordDTO] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => EditInspectionRecordDTO)
  data: EditInspectionRecordDTO[];
}
