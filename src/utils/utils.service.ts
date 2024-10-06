import {
  BadRequestException,
  Inject,
  Injectable,
  UnauthorizedException,
  forwardRef,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/entities/user.entity';
import * as bcrypt from 'bcrypt';
import { Request } from 'express';
import { UsersService } from 'src/modules/users/users.service';

@Injectable()
export class UtilsService {
  constructor(
    private config: ConfigService,
    private jwt: JwtService,
    @Inject(forwardRef(() => UsersService))
    private userService: UsersService,
  ) {}

  async getTokens(
    user: User,
  ): Promise<{ accessToken: String; refreshToken: String }> {
    const accessToken: String = await this.jwt.signAsync(
      { roles: user.roles, id: user.id, national_id: user.national_id },
      {
        expiresIn: '3h',
        secret: this.config.get('SECRET_KEY'),
      },
    );
    const refreshToken: String = await this.jwt.signAsync(
      { roles: user.roles, id: user.id, national_id: user.national_id },
      {
        expiresIn: '1d',
        secret: this.config.get('SECRET_KEY'),
      },
    );

    return {
      accessToken: accessToken.toString(),
      refreshToken: refreshToken.toString(),
    };
  }
  async hashString(input) {
    try {
      if (typeof input !== 'string') {
        throw new Error('Input must be a string');
      }
      const hash = await bcrypt.hash(input, 10);
      return hash;
    } catch (error) {
      console.error('Error occurred while hashing:', error.message);
    }
  }

  async getLoggedInProfile(req: Request) {
    const authorization = req.headers.authorization;
    if (authorization) {
      const token = authorization.split(' ')[1];
      if (!authorization.toString().startsWith('Bearer '))
        throw new UnauthorizedException('The provided token is invalid');
      const { tokenVerified, error } = this.jwt.verify(token, {
        secret: this.config.get('SECRET_KEY'),
      });
      if (error)
        throw new BadRequestException(
          'Errow accured while getting the profile ' + error.message,
        );
      const details: any = await this.jwt.decode(token);
      return await this.userService.getUserById(details.id, 'User');
    } else {
      throw new UnauthorizedException(
        'Please you are not authorized to access resource',
      );
    }
  }
}
