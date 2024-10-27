/* eslint-disable */
/*
 @auhor : © 2024 Valens Niyonsenga <valensniyonsenga2003@gmail.com>
*/

/**
 * @file
 * @brief module for role queries
 */
import { Global, Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from 'src/entities/role.entity';
import { RoleService } from './roles.service';

@Global()
@Module({
  providers: [RoleService],
  imports: [TypeOrmModule.forFeature([Role])],
  exports: [RoleService],
})
export class RoleModule {}
