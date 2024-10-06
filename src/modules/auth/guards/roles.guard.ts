import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
  Inject,
  BadRequestException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Role } from 'src/entities/role.entity';
import { User } from 'src/entities/user.entity';
import { UsersService } from 'src/modules/users/users.service';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    @Inject(JwtService) private jwtService: JwtService,
    @Inject(ConfigService) private configService: ConfigService,
    @Inject(UsersService) private userService: UsersService,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<String[]>('roles', [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredRoles) {
      return true;
    }
    const req = context.switchToHttp().getRequest();
    const authorization = req.headers.authorization;
    let user: User = null;
    if (
      authorization == undefined ||
      authorization == null ||
      authorization == ''
    )
      throw new UnauthorizedException(
        'Please you are not authorized to access resource',
      );
    if (authorization) {
      const token = authorization.split(' ')[1];
      if (!authorization.toString().startsWith('Bearer '))
        throw new UnauthorizedException('The provided token is invalid');

      try {
        const payload = this.jwtService.verify(token, {
          secret: this.configService.get('SECRET_KEY'),
        });
        req['user'] = payload;
        user = await this.userService.getUserById(payload.id, 'User');
      } catch (error) {
        if (error.name === 'TokenExpiredError') {
          throw new BadRequestException('Token has expired');
        } else {
          throw new UnauthorizedException('Token is invalid');
        }
      }
    }

    let type: boolean = false;
    user.roles.forEach((role1: Role) => {
      requiredRoles.forEach((requiredRole: String) => {
        if (requiredRole.toUpperCase() == role1.role_name) {
          type = true;
        }
      });
    });
    if (type == false)
      throw new UnauthorizedException(
        `This resource is only for ${requiredRoles
          .toLocaleString()
          .toUpperCase()}`,
      );
    return type;
  }
}
