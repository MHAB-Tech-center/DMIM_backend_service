import { Global, Module } from '@nestjs/common';
import { RmbService } from './rmb.service';
import { RmbController } from './rmb.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { UtilsModule } from 'src/utils/utils.module';
import { RMBStaffMember } from 'src/entities/RMBStaffMember.entity';
import { RoleModule } from '../roles/roles.module';

@Module({
  providers: [RmbService],
  controllers: [RmbController],
})
@Global()
@Module({
  imports: [
    TypeOrmModule.forFeature([RMBStaffMember]),
    JwtModule,
    RoleModule,
    UtilsModule,
  ],
  providers: [RmbService],
  controllers: [RmbController],
})
export class RmbModule {}
