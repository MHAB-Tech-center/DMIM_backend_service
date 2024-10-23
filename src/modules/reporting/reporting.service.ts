import { Injectable, Req } from '@nestjs/common';
import { InspectionsService } from '../inspections/inspections.service';
import * as XLSX from 'xlsx';
import { Response } from 'express';
import { UUID } from 'crypto';

@Injectable()
export class ReportingService {
  constructor(private inspectionsService: InspectionsService) {}

  async getInspectionsReport(planId: UUID, response: Response) {
    const inspections =
      await this.inspectionsService.getCategoriesInspectionPlan(planId);
    const workbook: XLSX.WorkBook = XLSX.utils.book_new();
    const sheetTitle = 'All inspe';
    const headers = [
      'Id',
      'Course Name',
      'Course Credits',
      'Course Weight',
      "Teacher's Name",
      "Teacher's Email",
      "Teacher's Phone Number",
    ];
    const data = [];
    data.push(headers);
    data.push(headers);

    const worksheet = XLSX.utils.aoa_to_sheet(data);
    XLSX.utils.book_append_sheet(workbook, worksheet, sheetTitle);

    const buffer = XLSX.write(workbook, { type: 'buffer', bookType: 'xlsx' });
    response.setHeader(
      'Content-Disposition',
      `attachment; filename=${sheetTitle}.xlsx`,
    );
    response.setHeader(
      'Content-Type',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    );
    response.send(buffer);
  }
}
