import { UUID } from 'crypto';
import { CreateRecordDTO } from './create-record.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class EditInspectionRecordDTO {
  @ApiProperty()
  @IsUUID()
  @IsNotEmpty()
  categoryId: UUID;
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  pseudoName: string;
  @ApiProperty()
  @IsNotEmpty()
  data: CreateRecordDTO;
}
