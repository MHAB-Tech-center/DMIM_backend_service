export class InspectionsResponseDTO {
  identification: any;
  records: any[];
  inspectionPlanId: any;
  summaryReport: any;
  minesite: any;

  constructor(
    identification: any,
    records: any[],
    inspectionPlanId: any,
    summaryReport: any,
    minesite: any,
  ) {
    this.inspectionPlanId = inspectionPlanId;
    this.identification = identification;
    this.summaryReport = summaryReport;
    this.records = records;
    this.minesite = minesite;
  }
}
