import { Module } from '@nestjs/common';
import { SystemFeatureService } from './features.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SystemFeature } from 'src/entities/system-feature.entity';

@Module({
  providers: [SystemFeatureService],
  imports: [TypeOrmModule.forFeature([SystemFeature])],
})
export class FeaturesModule {}
