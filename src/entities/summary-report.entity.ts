import { BaseEntity } from 'src/db/base-entity';
import { Entity } from 'typeorm';

@Entity('summary-reports')
export class SummaryReport extends BaseEntity {
  mainProblems: string;
  observations: string;
  recommendations: string;
  certificationStaus: string;
  gracePeriodEndon: Date;
  constructor(
    mainProblems: string,
    observations: string,
    recommendations: string,
    certificationStaus: string,
    gracePeriodEndon: Date,
  ) {
    super();
    this.mainProblems = mainProblems;
    this.observations = observations;
    this.recommendations = recommendations;
    this.certificationStaus = certificationStaus;
    this.gracePeriodEndon = gracePeriodEndon;
  }
}
