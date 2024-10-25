import { BaseEntity } from 'src/db/base-entity';
import { Entity } from 'typeorm';

@Entity('summary-reports')
export class SummaryReport extends BaseEntity {
  mainProblems: string;
  proposedRemedialActions: string;
  certificationStaus: string;
  gracePeriodEndon: Date;
  constructor(
    mainProblems: string,
    proposedRemedialActions: string,
    certificationStaus: string,
    gracePeriodEndon: Date,
  ) {
    super();
    this.mainProblems = mainProblems;
    this.proposedRemedialActions = proposedRemedialActions;
    this.certificationStaus = certificationStaus;
    this.gracePeriodEndon = gracePeriodEndon;
  }
}
