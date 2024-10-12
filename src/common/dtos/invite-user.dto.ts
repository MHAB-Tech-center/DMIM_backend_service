import { ApiProperty } from '@nestjs/swagger';
import { IsEmail } from 'class-validator';

export class InviteUser {
  @IsEmail()
  @ApiProperty()
  email: string;
}
