import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUUID } from 'class-validator';
import { UUID } from 'crypto';
import { CreateUserDto } from 'src/common/dtos/create-user.dto';

export class CreateInspectorDTO extends CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  inspectorRole: string;
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  province: string;

  @IsUUID()
  @IsNotEmpty()
  @ApiProperty()
  minesiteId: UUID;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  district: string;
}
