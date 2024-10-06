/* eslint-disable */
import { ApiOperation, ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNegative,
  IsNotEmpty,
  IsNumber,
  IsString,
  IsStrongPassword,
} from 'class-validator';

export class ResetPasswordDTO {
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  code: number;

  @IsString()
  @IsStrongPassword()
  @IsNotEmpty()
  @ApiProperty()
  newPassword: string;
}
