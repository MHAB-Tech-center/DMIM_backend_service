import { Global, Module } from '@nestjs/common';
import { RmbStaffController } from './rmb-staff.controller';
import { RMBStaffService } from './rmb-staff.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RMBStaffMember } from 'src/entities/RMBStaffMember.entity';
import { RMBRole } from 'src/entities/RMBRole.entity';
import { SystemFeature } from 'src/entities/system-feature.entity';

@Global()
@Module({
  controllers: [RmbStaffController],
  imports: [TypeOrmModule.forFeature([RMBStaffMember, RMBRole, SystemFeature])],
  providers: [RMBStaffService],
  exports: [RMBStaffService],
})
export class RmbStaffModule {}
