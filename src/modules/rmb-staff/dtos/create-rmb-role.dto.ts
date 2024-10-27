import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUUID } from 'class-validator';
import { UUID } from 'crypto';

export class CreateRMBRoleDTO {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  roleName: string;
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  roleDescription: string;
  @IsNotEmpty()
  @ApiProperty()
  featureIds: UUID[];
}
