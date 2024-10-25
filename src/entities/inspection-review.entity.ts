import { BaseEntity } from 'src/db/base-entity';
import { InspectionPlan } from './InspectionPlan.entity';
import { Entity, ManyToOne } from 'typeorm';

@Entity('reviews')
export class InspectionReview extends BaseEntity {
  @ManyToOne(() => InspectionPlan, (plan) => plan.reviews)
  inspectionPlan: InspectionPlan;
  comment: string;

  constructor(comment: string, inspectionPlan: InspectionPlan) {
    super();
    this.comment = comment;
    this.inspectionPlan = inspectionPlan;
  }
}
