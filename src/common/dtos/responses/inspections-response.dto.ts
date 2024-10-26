export class InspectionsResponseDTO {
  identification: any;
  records: any[];
  inspectionPlanId: any;
  summaryReport: any;

  constructor(
    identification: any,
    records: any[],
    inspectionPlanId: any,
    summaryReport: any,
  ) {
    this.inspectionPlanId = inspectionPlanId;
    this.identification = identification;
    this.summaryReport = summaryReport;
    this.records = records;
  }
}
