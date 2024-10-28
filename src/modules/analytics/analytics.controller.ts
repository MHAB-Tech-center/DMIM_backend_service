import { Controller, Get, Req, UseFilters } from '@nestjs/common';
import { AnalyticsService } from './analytics.service';
import { ApiResponse } from 'src/common/payload/ApiResponse';
import { ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { CustomExceptionFilter } from 'src/exceptions/CustomExceptionFilter';
import { Public } from 'src/decorators/public.decorator';

@Controller('analytics')
@ApiTags('analytics')
@UseFilters(CustomExceptionFilter) // Apply filter to the controller
export class AnalyticsController {
  constructor(private analyticsService: AnalyticsService) {}
  @Get('/inspector')
  @Public()
  async getInspectorDashBoard(@Req() request: Request): Promise<ApiResponse> {
    return new ApiResponse(
      true,
      'The admin inspector dashboard was retrieved successfully',
      await this.analyticsService.getInspectorDashBoard(request),
    );
  }
  @Get('rmb')
  @Public()
  async getAdminDashBoard(): Promise<ApiResponse> {
    return new ApiResponse(
      true,
      'The admin RMB dashboard was retrieved successfully',
      await this.analyticsService.getAdminDashBoard(),
    );
  }
}
