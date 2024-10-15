import { Module } from '@nestjs/common';
import { InspectionsService } from './inspections.service';
import { InspectionsController } from './inspections.controller';

@Module({
  providers: [InspectionsService],
  controllers: [InspectionsController]
})
export class InspectionsModule {}
