import { EInspectionStatus } from "src/common/Enum/EInspectionStatus.enum";

export class InspectionsResponseDTO {
  identification: any;
  records: any[];
  inspectionPlanId: any;
  summaryReport: any;
  minesite: any;
  status: EInspectionStatus

  constructor(
    identification: any,
    records: any[],
    inspectionPlanId: any,
    summaryReport: any,
    minesite: any,
    status: EInspectionStatus
  ) {
    this.inspectionPlanId = inspectionPlanId;
    this.identification = identification;
    this.summaryReport = summaryReport;
    this.records = records;
    this.minesite = minesite;
    this.status = status
  }
}
