import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
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
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  district: string;
}
