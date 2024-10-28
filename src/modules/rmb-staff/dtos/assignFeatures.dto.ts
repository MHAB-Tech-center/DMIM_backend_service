import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUUID } from 'class-validator';
import { UUID } from 'crypto';

export class AssignFeaturesDTO {
  @IsNotEmpty()
  @ApiProperty()
  features: string[];
  @IsUUID()
  @IsNotEmpty()
  @ApiProperty()
  roleId: UUID;
}
