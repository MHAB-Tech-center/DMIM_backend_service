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
  UseFilters,
} from '@nestjs/common';
import { LoginDTO } from 'src/common/dtos/lodin.dto';
import { UsersService } from 'src/modules/users/users.service';
import { ApiResponse } from 'src/common/payload/ApiResponse';
import { VerifyAccountDTO } from 'src/common/dtos/verify-account.dto';
import { ResetPasswordDTO } from 'src/common/dtos/reset-password.dto';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { Request } from 'express';
import { Public } from 'src/decorators/public.decorator';
import { Profile } from 'src/entities/profile.entity';
import { VerifyLoginDTO } from 'src/common/dtos/verify-login.dto';
import { CustomExceptionFilter } from 'src/exceptions/CustomExceptionFilter';

@ApiTags('auth')
@Controller('auth')
@UseFilters(CustomExceptionFilter) // Apply filter to the controller
export class AuthController {
  public isUserAvailable: Profile;
  constructor(
    private userService: UsersService,
    private authService: AuthService,
  ) {}

  @Public()
  @Post('/login')
  async login(@Body() dto: LoginDTO): Promise<ApiResponse> {
    try {
      return new ApiResponse(
        true,
        'We have sent a verification code to your email',
        await this.userService.login(dto),
      );
    } catch (error) {
      console.log(error);
    }
  }
  @Public()
  @Post('/verify-login')
  async verifyLogin(@Body() dto: VerifyLoginDTO) {
    const reponse = await this.userService.verifyLogin(dto);
    return reponse;
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
