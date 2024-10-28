import { Injectable } from '@nestjs/common';
import { InspectionsService } from '../inspections/inspections.service';
import { InspectorsService } from '../inspectors/inspectors.service';
import { InspectorDashBoardResponseDTO } from './dtos/inspection-dashboard-dto';
import { Request } from 'express';
import { RMBDashboardAnalyticsDTO } from './dtos/rmb-dashboard.dto';
import { Record } from './dtos/record.dto';

@Injectable()
export class AnalyticsService {
  constructor(
    private inspectionsService: InspectionsService,
    private inspectorService: InspectorsService,
  ) {}

  async getInspectorDashBoard(
    request: Request,
  ): Promise<InspectorDashBoardResponseDTO> {
    const inspections: number =
    //   await await this.inspectionsService.countReportsForLoggedInInspector(
        request,
      );
    const currentInspection =
      await this.inspectionsService.getCurrentPlanForLoggedInInspector(request);
    const dashboardReport = new InspectorDashBoardResponseDTO(
      inspections,
      currentInspection,
    );
    return dashboardReport;
  }
  async getAdminDashBoard(): Promise<RMBDashboardAnalyticsDTO> {
    const inspections: Record = new Record(
      await this.inspectionsService.countAllPlansByProvince('West'),
      await this.inspectionsService.countAllPlansByProvince('East'),
      await this.inspectionsService.countAllPlansByProvince('South'),
      await this.inspectionsService.countAllPlansByProvince('North'),
      await this.inspectionsService.countAllPlansByProvince('Kigali'),
    );
    const inspectors: Record = new Record(
      await this.inspectorService.countAllByProvince('West'),
      await this.inspectorService.countAllByProvince('East'),
      await this.inspectorService.countAllByProvince('South'),
      await this.inspectorService.countAllByProvince('North'),
      await this.inspectorService.countAllByProvince('Kigali'),
    );
    return new RMBDashboardAnalyticsDTO(inspectors, inspections);
  }
}
