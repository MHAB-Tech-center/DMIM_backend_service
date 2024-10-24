import { BaseEntity } from 'src/db/base-entity';
import { InspectionPlan } from './InspectionPlan.entity';
import { Entity, ManyToOne } from 'typeorm';

@Entity('reviews')
export class InspectionReview extends BaseEntity {
  @ManyToOne(() => InspectionPlan)
  inspectionPlan: InspectionPlan;
  comment: string;
}
