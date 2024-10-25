import { BaseEntity } from 'src/db/base-entity';
import { MineSite } from './minesite.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
} from 'typeorm';
import { Inspector } from './inspector.entity';
import { InspectionReview } from './inspection-review.entity';
import { InspectionIdentification } from './inspection-identification.entity';
import { SummaryReport } from './summary-report.entity';

@Entity('inspection_plans')
export class InspectionPlan extends BaseEntity {
  @ManyToOne(() => MineSite)
  minesiteInfo: MineSite;
  @ManyToOne(() => Inspector)
  @JoinColumn({ name: 'inspector_id' })
  inspectorInfo: Inspector;

  @OneToOne(() => InspectionIdentification)
  @JoinColumn({ name: 'identification_id' })
  identification: InspectionIdentification;
  @OneToOne(() => SummaryReport)
  @JoinColumn({ name: 'summary_id' })
  summaryReport: SummaryReport;
  @Column({ nullable: true })
  startDate: Date;
  @Column({ nullable: true })
  endDate: Date;
  @Column({
    name: 'status',
    nullable: true,
  })
  status: string;

  @OneToMany(() => InspectionReview, (review) => review.inspectionPlan)
  reviews: InspectionReview[];

  constructor(
    startDate: Date,
    endDate: Date,
    inspector: Inspector,
    minesite: MineSite,
  ) {
    super();
    this.startDate = startDate;
    this.endDate = endDate;
    this.inspectorInfo = inspector;
    this.minesiteInfo = minesite;
  }
}
