import { Global, Module } from '@nestjs/common';
import { InspectionsService } from './inspections.service';
import { InspectionsController } from './inspections.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InspectionPlan } from 'src/entities/InspectionPlan.entity';
import { Category } from 'src/entities/category.entity';
import { InspectionRecord } from 'src/entities/inspection-record.entity';

@Global()
@Module({
  providers: [InspectionsService],
  imports: [
    TypeOrmModule.forFeature([InspectionPlan, Category, InspectionRecord]),
  ],
  controllers: [InspectionsController],
  exports: [InspectionsService],
})
export class InspectionsModule {}
