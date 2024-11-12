import { EInspectionStatus } from "src/common/Enum/EInspectionStatus.enum";
import { InspectionIdentification } from "src/entities/inspection-identification.entity";
import { MineSite } from "src/entities/minesite.entity";
import { SummaryReport } from "src/entities/summary-report.entity";

export class InspectionsResponseDTO {
  identification: InspectionIdentification;
  records: any[];
  inspectionPlanId: any;
  summaryReport: SummaryReport;
  minesite: MineSite;
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
