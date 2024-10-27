import { Injectable } from '@nestjs/common';
import { InspectionsService } from '../inspections/inspections.service';
import * as XLSX from 'xlsx';
import { Response } from 'express';
import { UUID } from 'crypto';
import { InspectionPlan } from 'src/entities/InspectionPlan.entity';
import { Category } from 'src/entities/category.entity';
import { InspectionRecord } from 'src/entities/inspection-record.entity';

@Injectable()
export class ReportingService {
  constructor(private inspectionsService: InspectionsService) {}

  async getInspectionsReport(planId: UUID, response: Response) {
    const categories =
      await this.inspectionsService.getCategoriesReportInspectionPlan(planId);
    const inspectionPlan = await this.inspectionsService.getInspectionPlan(
      planId,
    );
    const workbook: XLSX.WorkBook = XLSX.utils.book_new();
    const sheetTitle = 'All inspe';
    const headers = [
      'Id',
      'Record Title',
      'Value',
      'flag',
      'Category',
      'Section',
      'inspectionPlan code',
    ];
    let data: any = [];
    let id = 1;
    categories.forEach((category: any) => {
      category.records.forEach((record: InspectionRecord) => {
        console.log(category.section.title);
        id++;
        data = [
          id,
          record.title,
          record.boxValue,
          100,
          record.flagValue,
          category.section.title,
          inspectionPlan.id,
        ];
        headers.push(data);
      });
    });
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
