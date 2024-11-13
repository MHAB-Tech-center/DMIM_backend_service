import { Injectable } from '@nestjs/common';
import { Response } from 'express';
import { UUID } from 'crypto';
import * as ExcelJS from 'exceljs';
import { InspectionsService } from '../inspections/inspections.service';
import { columns, RedFlagInformation } from 'src/utils/appData/constants';
import { InspectionsResponseDTO } from 'src/common/dtos/responses/inspections-response.dto';
import { InspectionRecord } from 'src/entities/inspection-record.entity';
import { Category } from 'src/entities/category.entity';

@Injectable()
export class ReportService {
  constructor(private inspectionService: InspectionsService) {}

  getFlabValues(report: InspectionsResponseDTO): RedFlagInformation {
    let redFlagInfo: RedFlagInformation = new RedFlagInformation();
    report.records.forEach((category: Category) => {
      if (category.section.flagStandard == 'RED') {
        category.records.forEach((record: InspectionRecord) => {
          switch (record.title) {
            case 'Non-State Armed Groups present in mine':
              redFlagInfo.ArmedGroupsPresent = record.boxValue;
              break;
            case 'Children present in mine':
              redFlagInfo.ChildrenPresent = record.boxValue;
              break;
            case 'Forced Labor at Mine':
              redFlagInfo.ForcedLabor = record.boxValue;
              break;
            case 'Influx of Foreign Minerals':
              redFlagInfo.ForeignMinerals = record.boxValue;
              break;
            default:
              redFlagInfo = redFlagInfo;
          }
        });
      }
    });
    return redFlagInfo;
  }
  async getInspectionsReport(planId: UUID, res: Response) {
    const report = await this.inspectionService.getCategoriesInspectionPlan(
      planId,
    );
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
    let redFlagInfo: RedFlagInformation = this.getFlabValues(report);
    //operatorAddress,
    worksheet.addRow({
     // Mine Information
MineNo: report.minesite?.code ? report.minesite.code : 'N/A',
parameters: 'N/A',
Subsites: 'N/A',
Operator: report.identification?.mineOperator ? report.identification.mineOperator : 'N/A',
operatorAddress: `${report.identification?.district || 'N/A'}, ${report.identification?.sector || 'N/A'}`,
ContactName: report.identification?.responsiblePersonNames ? report.identification.responsiblePersonNames : 'N/A',
ContactNumber: report.identification?.responsiblePersonContact ? report.identification.responsiblePersonContact : 'N/A',
OperatorNID: 'N/A',
OwnerName: report.identification?.mineOwner ? report.identification.mineOwner : 'N/A',
OwnerAddress: 'N/A',
OwnerNID: 'N/A',

// Mine Site Location
EastUTM: report.identification?.coordinates?.utm_east || 'N/A',
SouthUTM: report.identification?.coordinates?.utm_south || 'N/A',
DMSEast: report.identification?.coordinates?.dms_east || 'N/A',
SouthDMS: report.identification?.coordinates?.dms_south || 'N/A',
District: report.minesite?.district || 'N/A',
Sector: 'N/A',
Cell: 'N/A',

// Types of Minerals Produced
MinedMinerals: 'N/A',

// Mine License Information
ICGLRClassification: 'N/A',
TypeOfMineralLicense: '',
IssuedDate: 'N/A',
ExpiryDate: 'N/A',
SurfaceArea: 'N/A',
MineralLicenseType: 'N/A',
LicenseNumber: report.identification?.licenseNumber ? report.identification.licenseNumber : 'N/A',

// Mine Production Details
TypeofMine: 'N/A',
MiningActivityStatus: 'N/A',
ExploitationBegun: 'N/A',
NumberofWorkers: 'N/A',
AverageProduction: 'N/A',
NumberOfLargeOpenPitActive: 'N/A',
NumberOfLargeOpenPitAbandoned: 'N/A',
NumberOfSmallOpenPitAbandoned: 'N/A',
NumberOfSmallOpenPitActive: 'N/A',

// Mine Production Details ====
NumberOfUndergroundActive: 'N/A',
NumberOfUndergroundAbandoned: 'N/A',
RepresentativeDepth: 'N/A',
MonthlyProductiveCapacity: 'N/A',

// Production History ====
ProductionHistory: 'N/A',
CurrentstatusOfMinesite: 'N/A',
DateOfLastInspection: 'N/A',
NextInspectionDate: 'N/A',
ResponsibleOfLastMine: 'N/A',
LastMineInspection: 'N/A',
InspectionComments: report.summaryReport?.proposedRemedialActions || 'N/A',

// Red Flag Information ====
ArmedGroupsPresent: redFlagInfo?.ArmedGroupsPresent || 'N/A',
ChildrenPresent: redFlagInfo?.ChildrenPresent || 'N/A',
ForeignMinerals: redFlagInfo?.ForeignMinerals || 'N/A',
ForcedLabor: redFlagInfo?.ForcedLabor || 'N/A',

// AFP
SamplingTookPlace: 'N/A',

// National Mine Site Requirements
PPEAvailable: 'N/A',
SafetyAtOperatingSite: 'N/A',
EnvironmentalStatus: 'N/A',
Wayforwardcomment: report.summaryReport?.mainProblems || 'N/A',

    });

    worksheet.eachRow((row: any, rowNumber) => {
      row.eachCell((cell) => {
        cell.border = {
          top: { style: 'thin' },
          left: { style: 'thin' },
          bottom: { style: 'thin' },
          right: { style: 'thin' },
        };
      });

      if (rowNumber > 1) {
        // Skip header row
        row.eachCell((cell) => {
          cell.fill = {
            type: 'pattern',
            pattern: 'solid',
            fgColor: { argb: '008000' }, // Green background
          };
          cell.font = {
            color: { argb: 'FFFFFFFF' }, // White text (ARGB format)
          };
          cell.alignment = {
            vertical: 'middle',
            horizontal: 'left',
            wrapText: true,
          };
        });
      } else {
        row.eachCell((cell) => {
          cell.fill = {
            type: 'pattern',
            pattern: 'solid',
            fgColor: { argb: 'FFFFFF00' }, // Green background
          };
          cell.alignment = { vertical: 'middle', horizontal: 'left' };
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
    const inspectionReports =
      await this.inspectionService.getAllInspectionReports();
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
      let redFlagInfo: RedFlagInformation = this.getFlabValues(report);
      //operatorAddress,
      worksheet.addRow({
        // Mine Information
        MineNo: report.minesite?.code ? report.minesite.code : 'N/A',
        parameters: 'N/A',
        Subsites: 'N/A',
        Operator: report.identification?.mineOperator
          ? report.identification.mineOperator
          : 'N/A',
        operatorAddress: `${report.identification?.district || 'N/A'}, ${
          report.identification?.sector || 'N/A'
        }`,
        ContactName: report.identification?.responsiblePersonNames
          ? report.identification.responsiblePersonNames
          : 'N/A',
        ContactNumber: report.identification?.responsiblePersonContact
          ? report.identification.responsiblePersonContact
          : 'N/A',
        OperatorNID: 'N/A',
        OwnerName: report.identification?.mineOwner
          ? report.identification.mineOwner
          : 'N/A',
        OwnerAddress: 'N/A',
        OwnerNID: 'N/A',

        // Mine Site Location
        EastUTM: report.identification?.coordinates?.utm_east || 'N/A',
        SouthUTM: report.identification?.coordinates?.utm_south || 'N/A',
        DMSEast: report.identification?.coordinates?.dms_east || 'N/A',
        SouthDMS: report.identification?.coordinates?.dms_south || 'N/A',
        District: report.minesite?.district || 'N/A',
        Sector: 'N/A',
        Cell: 'N/A',

        // Types of Minerals Produced
        MinedMinerals: 'N/A',

        // Mine License Information
        ICGLRClassification: 'N/A',
        TypeOfMineralLicense: '',
        IssuedDate: 'N/A',
        ExpiryDate: 'N/A',
        SurfaceArea: 'N/A',
        MineralLicenseType: 'N/A',
        LicenseNumber: report.identification?.licenseNumber
          ? report.identification.licenseNumber
          : 'N/A',

        // Mine Production Details
        TypeofMine: 'N/A',
        MiningActivityStatus: 'N/A',
        ExploitationBegun: 'N/A',
        NumberofWorkers: 'N/A',
        AverageProduction: 'N/A',
        NumberOfLargeOpenPitActive: 'N/A',
        NumberOfLargeOpenPitAbandoned: 'N/A',
        NumberOfSmallOpenPitAbandoned: 'N/A',
        NumberOfSmallOpenPitActive: 'N/A',

        // Mine Production Details ====
        NumberOfUndergroundActive: 'N/A',
        NumberOfUndergroundAbandoned: 'N/A',
        RepresentativeDepth: 'N/A',
        MonthlyProductiveCapacity: 'N/A',

        // Production History ====
        ProductionHistory: 'N/A',
        CurrentstatusOfMinesite: 'N/A',
        DateOfLastInspection: 'N/A',
        NextInspectionDate: 'N/A',
        ResponsibleOfLastMine: 'N/A',
        LastMineInspection: 'N/A',
        InspectionComments:
          report.summaryReport?.proposedRemedialActions || 'N/A',

        // Red Flag Information ====
        ArmedGroupsPresent: redFlagInfo?.ArmedGroupsPresent || 'N/A',
        ChildrenPresent: redFlagInfo?.ChildrenPresent || 'N/A',
        ForeignMinerals: redFlagInfo?.ForeignMinerals || 'N/A',
        ForcedLabor: redFlagInfo?.ForcedLabor || 'N/A',

        // AFP
        SamplingTookPlace: 'N/A',

        // National Mine Site Requirements
        PPEAvailable: 'N/A',
        SafetyAtOperatingSite: 'N/A',
        EnvironmentalStatus: 'N/A',
        Wayforwardcomment: report.summaryReport?.mainProblems || 'N/A',
      });
    });
    worksheet.eachRow((row: any, rowNumber) => {
      row.eachCell((cell) => {
        cell.border = {
          top: { style: 'thin' },
          left: { style: 'thin' },
          bottom: { style: 'thin' },
          right: { style: 'thin' },
        };
      });
      if (rowNumber > 1) {
        // Skip header row
        const fill =
          rowNumber % 2 === 0
            ? {
                type: 'pattern',
                pattern: 'solid',
                fgColor: { argb: 'FFFAFAFA' },
              }
            : {
                type: 'pattern',
                pattern: 'solid',
                fgColor: { argb: 'FFFFFFFF' },
              };
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
