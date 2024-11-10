import { ApiProperty } from '@nestjs/swagger';
import { CreateSystemFeatureDTO } from './create-feature.dto';
import { IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateMultipleFeaturesDTO {
  @ApiProperty({ type: [CreateSystemFeatureDTO] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateSystemFeatureDTO)
  features: CreateSystemFeatureDTO[];
}
