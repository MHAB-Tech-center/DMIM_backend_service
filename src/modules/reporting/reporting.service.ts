import { Injectable } from '@nestjs/common';
import { InspectionsService } from '../inspections/inspections.service';
import * as XLSX from 'xlsx';
import { Response } from 'express';
import { UUID } from 'crypto';
import { InspectionPlan } from 'src/entities/InspectionPlan.entity';
import { Category } from 'src/entities/category.entity';
import { InspectionRecord } from 'src/entities/inspection-record.entity';
import * as ExcelJS from 'exceljs';


@Injectable()
export class ReportingService {
  constructor(private inspectionsService: InspectionsService) {}
  private users: any[] = [
    {
      id: 1,
      name: 'John Doe',
      email: 'john@example.com',
      phone: '+1234567890',
      status: 'Active',
      createdAt: new Date(),
    },
    {
      id: 2,
      name: 'Jane Smith',
      email: 'jane@example.com',
      phone: '+0987654321',
      status: 'Inactive',
      createdAt: new Date(),
    },
  ];

  async getInspectionsReport(planId: UUID, res: Response) {
    // const categories =
    //   await this.inspectionsService.getCategoriesReportInspectionPlan(planId);
    // const inspectionPlan = await this.inspectionsService.getInspectionPlan(
    //   planId,
    // );
    // const workbook: XLSX.WorkBook = XLSX.utils.book_new();
    // const sheetTitle = 'All inspe';
    // const data : any[]= [
    //  [
    //   'Id',
    //   'Record Title',
    //   'Value',
    //   'flag',
    //   'Category',
    //   'Section',
    //   'inspectionPlan code',
    //  ]
    // ];
    // // const data: any = [];
    // let id = 1;
    // categories.forEach((category: Category) => {
    //   category.records.forEach((record: InspectionRecord) => {
    //     id++;
    //     const newData = [
    //       id,
    //       record.title,
    //       record.boxValue,
    //       record.flagValue? record.flagValue : "None",
    //       category.title,
    //       category.section.title,
    //       inspectionPlan.id,
    //     ];
    //     data.push(newData)
    //   });
    // });

    // const worksheet = XLSX.utils.aoa_to_sheet(data);
    // XLSX.utils.book_append_sheet(workbook, worksheet, sheetTitle);

    // const buffer = XLSX.write(workbook, { type: 'buffer', bookType: 'xlsx' });
    // response.setHeader(
    //   'Content-Disposition',
    //   `attachment; filename=${sheetTitle}.xlsx`,
    // );
    // response.setHeader(
    //   'Content-Type',
    //   'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    // );
    // response.send(buffer);



     // Create a new workbook and worksheet
   const workbook = new ExcelJS.Workbook();
   const worksheet = workbook.addWorksheet('Users Report');

   // Define columns
   worksheet.columns = [
     { header: 'No', key: 'id', width: 10 },
     { header: 'Name', key: 'name', width: 20 },
     { header: 'Email', key: 'email', width: 30 },
     { header: 'Phone', key: 'phone', width: 20 },
     { header: 'Status', key: 'status', width: 15 },
     { header: 'Created At', key: 'createdAt', width: 20 },
   ];

   // Style the header row
   const headerRow = worksheet.getRow(1);
   headerRow.font = { bold: true };
   headerRow.fill = {
     type: 'pattern',
     pattern: 'solid',
     fgColor: { argb: 'FFE0E0E0' },
   };

   // Add data rows
   this.users.forEach((user) => {
     worksheet.addRow({
       id: user.id,
       name: user.name,
       email: user.email,
       phone: user.phone,
       status: user.status,
       createdAt: user.createdAt.toLocaleDateString(),
     });
   });

   // Style all cells
   worksheet.eachRow((row : any, rowNumber) => {
     row.eachCell((cell) => {
       cell.border = {
         top: { style: 'thin' },
         left: { style: 'thin' },
         bottom: { style: 'thin' },
         right: { style: 'thin' },
       };
     });
     
     // Add zebra striping
     if (rowNumber > 1) { // Skip header row
       const fill = rowNumber % 2 === 0 
         ? { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFFAFAFA' } }
         : { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFFFFFFF' } };
       row.eachCell((cell) => {
         cell.fill = fill;
       });
     }
   });

   // Set response headers
   res.setHeader(
     'Content-Type',
     'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
   );
   res.setHeader(
     'Content-Disposition',
     'attachment; filename=users-report.xlsx',
   );

   // Write to response
   await workbook.xlsx.write(res);
   res.end();

  }
}
