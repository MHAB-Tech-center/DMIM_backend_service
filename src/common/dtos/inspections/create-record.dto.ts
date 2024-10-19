import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { CreateCategoryDTO } from './create-cateory.dto';

export class CreateRecordDTO {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  title: string;
  @ApiProperty()
  @IsOptional()
  @IsString()
  boxValue: string;
  @ApiProperty()
  @IsOptional()
  @IsString()
  flagValue: string;
  @ApiProperty()
  @IsOptional()
  marks: number;
  @ApiProperty()
  category: CreateCategoryDTO;
}
