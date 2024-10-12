/* eslint-disable */
import { IsString, IsNotEmpty, IsEmail, IsPhoneNumber } from 'class-validator';
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
  gender: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  registercode: string = 'DMIM232@3$';

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
