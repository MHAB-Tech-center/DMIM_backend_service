import { Module } from '@nestjs/common';
import { FeaturesController } from './features.controller';
import { SystemFeatureService } from './features.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SystemFeature } from 'src/entities/system-feature.entity';

@Module({
  providers: [SystemFeatureService],
  controllers: [FeaturesController],
  imports: [TypeOrmModule.forFeature([SystemFeature])],
})
export class FeaturesModule {}
