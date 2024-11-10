import { InspectionsResponseDTO } from 'src/common/dtos/responses/inspections-response.dto';
import { InspectionPlan } from 'src/entities/InspectionPlan.entity';

export class InspectorDashBoardResponseDTO {
  inspections: number;
  latestInspectionPlan: InspectionPlan;
  constructor(inspections: number, latestInspection: InspectionPlan) {
    this.inspections = inspections;
    this.latestInspectionPlan = latestInspection;
  }
}
