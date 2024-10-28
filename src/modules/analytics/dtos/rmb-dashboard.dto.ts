import { Record } from './record.dto';

export class RMBDashboardAnalyticsDTO {
  inspectors: Record;
  inspectionReports: Record;
  constructor(inspectors: Record, inspectionReports: Record) {
    this.inspectors = inspectors;
    this.inspectionReports = inspectionReports;
  }
}
