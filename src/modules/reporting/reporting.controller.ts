import { Controller, Get, Param, Res, UseFilters } from '@nestjs/common';
import { ReportingService } from './reporting.service';
import { Response } from 'express';
import { ApiResponse } from 'src/common/payload/ApiResponse';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CustomExceptionFilter } from 'src/exceptions/CustomExceptionFilter';
import { Public } from 'src/decorators/public.decorator';
import { UUID } from 'crypto';
import { Roles } from 'src/utils/decorators/roles.decorator';

@Controller('reporting')
@ApiTags('reporting')
@ApiBearerAuth()
@UseFilters(CustomExceptionFilter) // Apply filter to the controller
export class ReportingController {
  constructor(private reportingService: ReportingService) {}

  @Get('inspections/:planId')
  @Roles('ADMIN','RMB')
  async getInspectionsReport(
    @Res() response: Response,
    @Param('id') planId: UUID,
  ) {
    return new ApiResponse(
      true,
      'The file downloaded successfully',
      await this.reportingService.getInspectionsReport(planId, response),
    );
  }
}
