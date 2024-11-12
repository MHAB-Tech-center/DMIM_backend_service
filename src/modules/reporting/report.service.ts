import { Injectable } from '@nestjs/common';
import { Response } from 'express';
import { UUID } from 'crypto';
import * as ExcelJS from 'exceljs';
import { InspectionsService } from '../inspections/inspections.service';
import { columns } from 'src/utils/appData/constants';


@Injectable()
export class ReportService {
  constructor(private inspectionService: InspectionsService){}
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
   const report = await this.inspectionService.getCategoriesInspectionPlan(planId)
   const workbook = new ExcelJS.Workbook();
   const worksheet = workbook.addWorksheet('Users Report');
   worksheet.columns = columns;
   const headerRow = worksheet.getRow(1);
   headerRow.font = { bold: true };
   headerRow.fill = {
     type: 'pattern',
     pattern: 'solid',
     fgColor: { argb: 'FFE0E0E0' },
   };
   //operatorAddress,

   this.users.forEach((user) => {
     worksheet.addRow({
       MineNo: report.minesite.code,  
       parameters: "N/A",
       Subsites: "N/A",
       Operator: report.identification.mineOperator,
       operatorAddress: `${report.identification.province},${report.identification.district}`,
       ContactName: report.identification.responsiblePersonNames,
       ContactNumber : report.identification.responsiblePersonContact,
       OperatorNID: "N/A",
       OwnerName: report.identification.mineOwner,
       OwnerAddress: "N/A",
       OwnerNID: "N/A",
       EastUTM : report.identification.coordinates.utm_east,
       SouthUTM : report.identification.coordinates.utm_south,
       DMSEast: report.identification.coordinates.dms_east,
       SouthDMS: report.identification.coordinates.dms_south,
       District: report.minesite.district,
       Sector: "N/A",
       Cell: "N/A",
       MinedMinerals: "N.A",
       createdAt: user.createdAt.toLocaleDateString(),
     });
   });

   worksheet.eachRow((row : any, rowNumber) => {
     row.eachCell((cell) => {
       cell.border = {
         top: { style: 'thin' },
         left: { style: 'thin' },
         bottom: { style: 'thin' },
         right: { style: 'thin' },
       };
     });
     
     if (rowNumber > 1) { // Skip header row
       const fill = rowNumber % 2 === 0 
         ? { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFFAFAFA' } }
         : { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFFFFFFF' } };
       row.eachCell((cell) => {
         cell.fill = fill;
       });
     }
   });

   res.setHeader(
     'Content-Type',
     'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
   );
   res.setHeader(
     'Content-Disposition',
     'attachment; filename=users-report.xlsx',
   );

   await workbook.xlsx.write(res);
   res.end();

  }
}
