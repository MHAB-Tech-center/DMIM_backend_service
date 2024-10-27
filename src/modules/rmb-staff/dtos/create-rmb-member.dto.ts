import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { CreateUserDto } from 'src/common/dtos/create-user.dto';

export class CreateRMBStaffMemberDTO extends CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  province: string;
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  district: string;
}
