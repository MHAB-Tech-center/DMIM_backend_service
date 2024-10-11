import { Module } from '@nestjs/common';
import { InspectorsService } from './inspectors.service';
import { InspectorsController } from './inspectors.controller';

@Module({
  providers: [InspectorsService],
  controllers: [InspectorsController],
})
export class InspectorsModule {}
