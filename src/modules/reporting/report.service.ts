import { Injectable } from '@nestjs/common';
import { Response } from 'express';
import { UUID } from 'crypto';
import * as ExcelJS from 'exceljs';
import { InspectionsService } from '../inspections/inspections.service';
import { columns } from 'src/utils/appData/constants';
import { InspectionsResponseDTO } from 'src/common/dtos/responses/inspections-response.dto';


@Injectable()
export class ReportService {
  constructor(private inspectionService: InspectionsService){}

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
     fgColor: { argb: 'green' },
   };
   //operatorAddress,
     worksheet.addRow({
      // mine name / ID Number
       MineNo: report.minesite.code,  
       parameters: "N/A",
       Subsites: "N/A",
      //  Mine site Operator & Owner
       Operator: report.identification.mineOperator,
       operatorAddress: `${report.identification.province},${report.identification.district}`,
       ContactName: report.identification.responsiblePersonNames,
       ContactNumber : report.identification.responsiblePersonContact,
       OperatorNID: "N/A",
       OwnerName: report.identification.mineOwner,
       OwnerAddress: "N/A",
       OwnerNID: "N/A",
      //  Mine site location
       EastUTM : report.identification.coordinates.utm_east,
       SouthUTM : report.identification.coordinates.utm_south,
       DMSEast: report.identification.coordinates.dms_east,
       SouthDMS: report.identification.coordinates.dms_south,
       District: report.minesite.district,
       Sector: "N/A",
       Cell: "N/A",
      //  Types of Minerals Produced
       MinedMinerals: "N.A",
      //  Mine Lisence Information
       ICGLRClassification :"N/A",
       TypeOfMineralLicense:"",
      //  Mine Lisence Information
       LicenseNumber: report.identification.licenseNumber,
       IssuedDate: "N/A",
       ExpiryDate : "N/A",
       SurfaceArea: "N/A",
      //  Mine Production Details
       TypeofMine: "N/A",
       MiningActivityStatus: "N/A",
       ExploitationBegun: "N/A",
       NumberofWorkers: "N/A",
       AverageProduction: "N/A",
       NumberOfLLargeOpen: "N/A",
       NumberOfLargeOpenPit: "N/A",
       NumberOfSmallOpenPit: "N/A",
      //  Mine Production Details ====
       NumberOfUndergroundActive: "N/A",
       NumberOfUndergroundAbandoned:"N/A",
       RepresentativeDepth: "N/A",
       MonthlyProductiveCapacity:"N/A",
      //  Production History====
       ProductionHistory: "N/A",
       CurrentstatusOfMinesite: "N/A",
       DateOfLastInspection:"N/A",
       NextInspectionDate: "N/A",
       ResponsibleOfLastMine:"N/A",
       LastMineInspection: "N/A",
       InspectionComments: report.summaryReport.proposedRemedialActions,
      //  Red flag information====
       ArmedGroupsPresent:"N/A",
       ChildrenPresent: "N/A",
       ForeignMinerals: "N/A",
      //  AFP
       SamplingTookPlace:"N/A",
      //  National mine site requirements
       PPEAvailable:"N/A",
       SafetyAtOperatingSite:"N/A",
       EnvironmentalStatus:"N/A",
       Wayforwardcomment: report.summaryReport.mainProblems,
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
  async getInspectionsReports(res: Response) {
    const inspectionReports = await this.inspectionService.getAllInspectionReports()
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Users Report');
    worksheet.columns = columns;
    const headerRow = worksheet.getRow(1);
    headerRow.font = { bold: true };
    headerRow.fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'green' },
    };
    inspectionReports.forEach((report: InspectionsResponseDTO) => {
  //operatorAddress,
  worksheet.addRow({
    // mine name / ID Number
     MineNo: report.minesite.code,  
     parameters: "N/A",
     Subsites: "N/A",
    //  Mine site Operator & Owner
     Operator: report.identification.mineOperator,
     operatorAddress: `${report.identification.province},${report.identification.district}`,
     ContactName: report.identification.responsiblePersonNames,
     ContactNumber : report.identification.responsiblePersonContact,
     OperatorNID: "N/A",
     OwnerName: report.identification.mineOwner,
     OwnerAddress: "N/A",
     OwnerNID: "N/A",
    //  Mine site location
     EastUTM : report.identification.coordinates.utm_east,
     SouthUTM : report.identification.coordinates.utm_south,
     DMSEast: report.identification.coordinates.dms_east,
     SouthDMS: report.identification.coordinates.dms_south,
     District: report.minesite.district,
     Sector: "N/A",
     Cell: "N/A",
    //  Types of Minerals Produced
     MinedMinerals: "N.A",
    //  Mine Lisence Information
     ICGLRClassification :"N/A",
     TypeOfMineralLicense:"",
    //  Mine Lisence Information
     LicenseNumber: report.identification.licenseNumber,
     IssuedDate: "N/A",
     ExpiryDate : "N/A",
     SurfaceArea: "N/A",
    //  Mine Production Details
     TypeofMine: "N/A",
     MiningActivityStatus: "N/A",
     ExploitationBegun: "N/A",
     NumberofWorkers: "N/A",
     AverageProduction: "N/A",
     NumberOfLLargeOpen: "N/A",
     NumberOfLargeOpenPit: "N/A",
     NumberOfSmallOpenPit: "N/A",
    //  Mine Production Details ====
     NumberOfUndergroundActive: "N/A",
     NumberOfUndergroundAbandoned:"N/A",
     RepresentativeDepth: "N/A",
     MonthlyProductiveCapacity:"N/A",
    //  Production History====
     ProductionHistory: "N/A",
     CurrentstatusOfMinesite: "N/A",
     DateOfLastInspection:"N/A",
     NextInspectionDate: "N/A",
     ResponsibleOfLastMine:"N/A",
     LastMineInspection: "N/A",
     InspectionComments: report.summaryReport.proposedRemedialActions,
    //  Red flag information====
     ArmedGroupsPresent:"N/A",
     ChildrenPresent: "N/A",
     ForeignMinerals: "N/A",
    //  AFP
     SamplingTookPlace:"N/A",
    //  National mine site requirements
     PPEAvailable:"N/A",
     SafetyAtOperatingSite:"N/A",
     EnvironmentalStatus:"N/A",
     Wayforwardcomment: report.summaryReport.mainProblems,
   });
    })
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
