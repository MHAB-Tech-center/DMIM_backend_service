import { BaseEntity } from 'src/db/base-entity';
import { InspectionPlan } from './InspectionPlan.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { Exclude } from 'class-transformer';

@Entity('reviews')
export class InspectionReview extends BaseEntity {
  @ManyToOne(() => InspectionPlan, (plan) => plan.reviews)
  @JoinColumn({ name: 'plan_id' })
  inspectionPlan: InspectionPlan;
  @Column()
  comment: string;
  constructor(comment: string, inspectionPlan: InspectionPlan) {
    super();
    this.comment = comment;
    this.inspectionPlan = inspectionPlan;
  }
}
