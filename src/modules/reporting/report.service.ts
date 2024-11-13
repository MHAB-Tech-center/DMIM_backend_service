import { Injectable } from '@nestjs/common';
import { Response } from 'express';
import { UUID } from 'crypto';
import * as ExcelJS from 'exceljs';
import { InspectionsService } from '../inspections/inspections.service';
import {
  columns,
  RecordedValues,
  RedFlagInformation,
} from 'src/utils/appData/constants';
import { InspectionsResponseDTO } from 'src/common/dtos/responses/inspections-response.dto';
import { InspectionRecord } from 'src/entities/inspection-record.entity';
import { Category } from 'src/entities/category.entity';
import { UtilsService } from 'src/utils/utils.service';

@Injectable()
export class ReportService {
  constructor(
    private inspectionService: InspectionsService,
    private utilsService: UtilsService,
  ) {}

  async getInspectionsReport(planId: UUID, res: Response) {
    const report: InspectionsResponseDTO =
      await this.inspectionService.getCategoriesInspectionPlan(planId);
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Inspections Report');
    worksheet.columns = columns;
    const headerRow = worksheet.getRow(1);
    headerRow.font = { bold: true };
    let redFlagInfo: RedFlagInformation =
      this.utilsService.getRedFlabValues(report);
    const data: RecordedValues = this.utilsService.getOtherFlabValues(report);
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
      Sector: report.identification?.sector || 'N/A',
      Cell: report.identification?.cell || 'N/A',

      // Types of Minerals Produced
      MinedMinerals: data.MinedMinerals,

      // Mine License Information
      ICGLRClassification: data.ICGLRClassification,
      TypeOfMineralLicense: data.TypeOfMineralLicense,
      IssuedDate: data.IssuedDate,
      ExpiryDate: data.ExpiryDate,
      SurfaceArea: data.SurfaceArea,
      MineralLicenseType: data.MineralLicenseType,
      LicenseNumber: report.identification?.licenseNumber
        ? report.identification.licenseNumber
        : 'N/A',

      // Mine Production Details
      TypeofMine: data.TypeofMine,
      ExploitationBegun: data.ExploitationBegun,
      NumberofWorkers: data.NumberofWorkers,
      AverageProduction: data.AverageProducation,
      NumberOfLargeOpenPitActive: data.NumberOfLargeOpenPitActive,
      NumberOfLargeOpenPitAbandoned: data.NumberOfLargeOpenPitAbandoned,
      NumberOfSmallOpenPitAbandoned: data.NumberOfSmallOpenPitAbandoned,
      NumberOfSmallOpenPitActive: data.NumberOfSmallOpenPitActive,

      // Mine Production Details ====
      NumberOfUndergroundActive: data.NumberOfUndergroundActive,
      MiningActivityStatus: data.MiningActivityStatus,
      NumberOfUndergroundAbandoned: data.NumberOfUndergroundAbandoned,
      RepresentativeDepth: data.RepresentativeDepth,
      MonthlyProductiveCapacity: data.MonthlyProductiveCapacity,

      // Production History ====
      ProductionHistory: data.ProductionHistory,
      CurrentstatusOfMinesite: data.CurrentstatusOfMinesite,
      DateOfLastInspection: data.DateOfLastInspection,
      NextInspectionDate: data.NextInspectionDate,
      ResponsibleOfLastMine: data.ResponsibleOfLastMine,
      LastMineInspection: data.LastMineInspection,
      NumberOfMine: data.NumberOfMine,
      NumberOfWorkers: data.NumberOfWorkers,
      AverageProducation: data.AverageProducation,
      AverageRepresentative: data.AverageRepresentative,
      MineSiteMonthly: data.MineSiteMonthly,
      InspectionComments: data.InspectionComments,

      // Red Flag Information ====
      ArmedGroupsPresent: redFlagInfo?.ArmedGroupsPresent || 'N/A',
      ChildrenPresent: redFlagInfo?.ChildrenPresent || 'N/A',
      ForeignMinerals: redFlagInfo?.ForeignMinerals || 'N/A',
      ForcedLabor: redFlagInfo?.ForcedLabor || 'N/A',

      // AFP
      SamplingTookPlace: data.SamplingTookPlace,

      // National Mine Site Requirements
      PPEAvailable: data.PPEAvailable,
      SafetyAtOperatingSite: data.SafetyAtOperatingSite,
      EnvironmentalStatus: data.EnvironmentalStatus,
      Wayforwardcomment: data.Wayforwardcomment,
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
      'attachment; filename=Inspections-report.xlsx',
    );

    await workbook.xlsx.write(res);
    res.end();
  }
  async getInspectionsReports(res: Response) {
    const inspectionReports =
      await this.inspectionService.getAllInspectionReports();
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Inspections Report');
    worksheet.columns = columns;
    const headerRow = worksheet.getRow(1);
    headerRow.font = { bold: true };
    headerRow.fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'green' },
    };
    let data: RecordedValues = null;
    let redFlagInfo: RedFlagInformation = null;
    inspectionReports.forEach((report: InspectionsResponseDTO) => {
      data = this.utilsService.getOtherFlabValues(report);
      redFlagInfo = this.utilsService.getRedFlabValues(report);
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
        Sector: report.identification?.sector || 'N/A',
        Cell: report.identification?.cell || 'N/A',

        // Types of Minerals Produced
        MinedMinerals: data.MinedMinerals,

        // Mine License Information
        ICGLRClassification: data.ICGLRClassification,
        TypeOfMineralLicense: data.TypeOfMineralLicense,
        IssuedDate: data.IssuedDate,
        ExpiryDate: data.ExpiryDate,
        SurfaceArea: data.SurfaceArea,
        MineralLicenseType: data.MineralLicenseType,
        LicenseNumber: report.identification?.licenseNumber
          ? report.identification.licenseNumber
          : 'N/A',

        // Mine Production Details
        TypeofMine: data.TypeofMine,
        MiningActivityStatus: data.MiningActivityStatus,
        ExploitationBegun: data.ExploitationBegun,
        NumberofWorkers: data.NumberofWorkers,
        AverageProduction: data.AverageProducation,
        NumberOfLargeOpenPitActive: data.NumberOfLargeOpenPitActive,
        NumberOfLargeOpenPitAbandoned: data.NumberOfLargeOpenPitAbandoned,
        NumberOfSmallOpenPitAbandoned: data.NumberOfSmallOpenPitAbandoned,
        NumberOfSmallOpenPitActive: data.NumberOfSmallOpenPitActive,

        // Mine Production Details ====
        NumberOfUndergroundActive: data.NumberOfUndergroundActive,
        NumberOfUndergroundAbandoned: data.NumberOfUndergroundAbandoned,
        RepresentativeDepth: data.RepresentativeDepth,
        MonthlyProductiveCapacity: data.MonthlyProductiveCapacity,

        // Production History ====
        ProductionHistory: data.ProductionHistory,
        CurrentstatusOfMinesite: data.CurrentstatusOfMinesite,
        DateOfLastInspection: data.DateOfLastInspection,
        NextInspectionDate: data.NextInspectionDate,
        ResponsibleOfLastMine: data.ResponsibleOfLastMine,
        LastMineInspection: data.LastMineInspection,
        NumberOfMine: data.NumberOfMine,
        NumberOfWorkers: data.NumberOfWorkers,
        AverageProducation: data.AverageProducation,
        AverageRepresentative: data.AverageRepresentative,
        MineSiteMonthly: data.MineSiteMonthly,
        InspectionComments: data.InspectionComments,

        // Red Flag Information ====
        ArmedGroupsPresent: redFlagInfo?.ArmedGroupsPresent || 'N/A',
        ChildrenPresent: redFlagInfo?.ChildrenPresent || 'N/A',
        ForeignMinerals: redFlagInfo?.ForeignMinerals || 'N/A',
        ForcedLabor: redFlagInfo?.ForcedLabor || 'N/A',

        // AFP
        SamplingTookPlace: data.SamplingTookPlace,

        // National Mine Site Requirements
        PPEAvailable: data.PPEAvailable,
        SafetyAtOperatingSite: data.SafetyAtOperatingSite,
        EnvironmentalStatus: data.EnvironmentalStatus,
        Wayforwardcomment: data.Wayforwardcomment,
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
      'attachment; filename=inspections-report.xlsx',
    );

    await workbook.xlsx.write(res);
    res.end();
  }
}
