import { IsEmail, IsNotEmpty, IsNumber } from 'class-validator';
import { LoginDTO } from './lodin.dto';
import { ApiProperty } from '@nestjs/swagger';

export class VerifyLoginDTO extends LoginDTO {
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  activationCode: number;
}
