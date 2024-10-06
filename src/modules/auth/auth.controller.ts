/* eslint-disable */
/*
 @auhor : © 2024 Valens Niyonsenga <valensniyonsenga2003@gmail.com>
*/

/**
 * @file
 * @brief controller for auth queries
 */
import {
  BadRequestException,
  Body,
  Controller,
  ForbiddenException,
  Get,
  Param,
  Post,
  Put,
  Req,
  Res,
} from '@nestjs/common';
import { LoginDTO } from 'src/common/dtos/lodin.dto';
import { UsersService } from 'src/modules/users/users.service';
import * as bcrypt from 'bcrypt';
import { ApiResponse } from 'src/common/payload/ApiResponse';
import { VerifyAccountDTO } from 'src/common/dtos/verify-account.dto';
import { User } from 'src/entities/user.entity';
import { ResetPasswordDTO } from 'src/common/dtos/reset-password.dto';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { Request, Response } from 'express';
import { Public } from 'src/decorators/public.decorator';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  public isUserAvailable: User;
  constructor(
    private userService: UsersService,
    private authService: AuthService,
  ) {}

  @Public()
  @Post('/login')
  async login(@Body() dto: LoginDTO): Promise<ApiResponse> {
    this.isUserAvailable = await this.userService.getOneByEmail(dto.email);
    if (!this.isUserAvailable)
      throw new ForbiddenException('Invalid email or password');
    const arePasswordsMatch = await bcrypt.compare(
      dto.password.toString(),
      this.isUserAvailable.password.toString(),
    );
    if (!arePasswordsMatch)
      throw new BadRequestException('Invalid email or password');
    return new ApiResponse(
      true,
      'User loggedInSucccessfully',
      await this.userService.login(dto),
    );
  }
  @Put('verify_account')
  @Public()
  async VerifyAccount(@Body() dto: VerifyAccountDTO): Promise<ApiResponse> {
    return new ApiResponse(
      true,
      'Your account is verified successfully',
      await this.userService.verifyAccount(dto.verificationCode),
    );
  }
  @Get('get_code/:email')
  @Public()
  async getVerificationCode(
    @Param('email') email: string,
  ): Promise<ApiResponse> {
    return new ApiResponse(
      true,
      'We have sent a verification code to your email',
      await this.userService.getVerificationCode(email, true),
    );
  }

  @Put('reset_password')
  @Public()
  async resetPassword(@Body() dto: ResetPasswordDTO): Promise<ApiResponse> {
    return new ApiResponse(
      true,
      'Your password was rest successfully ',
      await this.userService.resetPassword(dto.code, dto.newPassword),
    );
  }
  @Get('/get-profile')
  async getProfile(@Req() req: Request) {
    let profile = await this.authService.getProfile(req);
    return profile;
  }
}
