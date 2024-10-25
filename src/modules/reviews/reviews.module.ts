import { Global, Module } from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { ReviewsController } from './reviews.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InspectionReview } from 'src/entities/inspection-review.entity';

@Global()
@Module({
  providers: [ReviewsService],
  imports: [TypeOrmModule.forFeature([InspectionReview])],
  controllers: [ReviewsController],
  exports: [ReviewsService],
})
export class ReviewsModule {}
