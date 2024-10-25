import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsNotEmpty, IsString } from 'class-validator';

export class InspectionIdentificationDTO {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  mineOwner: string;
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  mineOperator: string;
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  perimeter: string;
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  subsitesName: string;
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  licenseNumber: string;
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  mainBuyers: string;
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  licenseCategory: string;
  @IsNotEmpty()
  @ApiProperty()
  licenseIssueDate: Date;
  @IsNotEmpty()
  @ApiProperty()
  licenseExpirationDate: Date;
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  province: string;
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  district: string;
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  sector: string;
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  cell: string;
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  coordinates: string;
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  responsiblePersonNames: string;
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  responsiblePersonTitle: string;
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  responsiblePersonContact: string;
}
