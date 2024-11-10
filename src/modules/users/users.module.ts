/* eslint-disable */
/*
 @auhor : © 2024 Valens Niyonsenga <valensniyonsenga2003@gmail.com>
*/

/**
 * @file
 * @brief file for user module
 */
import { Global, Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UtilsModule } from 'src/utils/utils.module';
import { JwtModule } from '@nestjs/jwt';
import { Profile } from 'src/entities/profile.entity';
import { RoleModule } from '../roles/roles.module';

@Global()
@Module({
  controllers: [UsersController],
  imports: [
    TypeOrmModule.forFeature([Profile]),
    RoleModule,
    JwtModule,
    UtilsModule,
  ],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
// {provide:APP_GUARD, useClass:RolesGuard}
