import { Global, Module } from '@nestjs/common';
import { InspectorsService } from './inspectors.service';
import { InspectorsController } from './inspectors.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Inspector } from 'src/entities/inspector.entity';
import { UtilsModule } from 'src/utils/utils.module';
import { RoleModule } from '../roles/role.module';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([Inspector]), RoleModule, UtilsModule],
  providers: [InspectorsService],
  controllers: [InspectorsController],
  exports: [InspectorsService],
})
export class InspectorsModule {}
