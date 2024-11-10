import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsNotEmpty, IsString } from 'class-validator';

export class SummaryReportDTO {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  mainProblems: string;
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  proposedRemedialActions: string;
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  certificationStatus: string;
}
