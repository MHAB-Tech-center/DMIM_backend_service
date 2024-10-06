import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { Question } from './Question.entity';
import { InspectionPlan } from './InspectionPlan.entity';
import { BaseEntity } from 'src/db/base-entity';

@Entity('results')
export class InspectionResults extends BaseEntity {
  @ManyToOne(() => Question)
  question: Question;

  @Column('text')
  answer: any;

  @ManyToOne(() => InspectionPlan)
  @JoinColumn({ name: 'inspection_plan_id' })
  inspectionPlan: InspectionPlan;
}
