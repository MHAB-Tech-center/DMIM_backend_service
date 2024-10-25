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
  observations: string;
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  recommendations: string;
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  certificationStaus: string;
  @IsNotEmpty()
  @ApiProperty()
  gracePeriodEndon: Date;
}
