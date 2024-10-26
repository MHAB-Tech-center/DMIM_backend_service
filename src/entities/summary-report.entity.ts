import { BaseEntity } from 'src/db/base-entity';
import { Column, Entity } from 'typeorm';

@Entity('summary-reports')
export class SummaryReport extends BaseEntity {
  @Column({ nullable: true })
  mainProblems: string;
  @Column({ nullable: true })
  proposedRemedialActions: string;
  @Column({ nullable: true })
  certificationStaus: string;
  constructor(
    mainProblems: string,
    proposedRemedialActions: string,
    certificationStaus: string,
  ) {
    super();
    this.mainProblems = mainProblems;
    this.proposedRemedialActions = proposedRemedialActions;
    this.certificationStaus = certificationStaus;
  }
}
