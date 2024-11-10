/* eslint-disable */
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class VerifyAccountDTO {
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  verificationCode: number;
}
