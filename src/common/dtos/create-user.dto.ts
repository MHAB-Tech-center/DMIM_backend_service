/* eslint-disable */
import {
  IsString,
  IsNotEmpty,
  IsEnum,
  IsEmail,
  IsStrongPassword,
  IsPhoneNumber,
  IsDate,
} from 'class-validator';
import { EGender } from '../Enum/EGender.enum';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  lastName: string;

  @IsString()
  @IsNotEmpty()
  @IsEmail()
  @ApiProperty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  username: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  myGender: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  registercode: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  national_id: string;

  // @IsDate()
  // dob: Date;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  @IsPhoneNumber()
  phonenumber: string;
}
