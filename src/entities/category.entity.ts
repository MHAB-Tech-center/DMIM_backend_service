import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { Section } from './section.entity';
import { InspectionPlan } from './InspectionPlan.entity';
import { BaseEntity } from 'src/db/base-entity';

@Entity('categories')
export class Category extends BaseEntity {
  @Column({ name: 'title' })
  title: string;

  @ManyToOne(() => InspectionPlan)
  @JoinColumn({ name: 'inspection_plan' })
  inspectionPlan: InspectionPlan;

  @ManyToOne(() => Section)
  @JoinColumn({ name: 'section_id' })
  section: Section;

  constructor(title: string, inspectionPlan: InspectionPlan, section: Section) {
    super();
    this.title = title;
    this.inspectionPlan = inspectionPlan;
    this.section = section;
  }
}
