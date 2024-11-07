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
    const data : any[]= [
     [
      'Id',
      'Record Title',
      'Value',
      'flag',
      'Category',
      'Section',
      'inspectionPlan code',
     ]
    ];
    // const data: any = [];
    let id = 1;
    categories.forEach((category: Category) => {
      category.records.forEach((record: InspectionRecord) => {
        id++;
        const newData = [
          id,
          record.title,
          record.boxValue,
          record.flagValue? record.flagValue : "None",
          category.title,
          category.section.title,
          inspectionPlan.id,
        ];
        data.push(newData)
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
