import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  UseFilters,
} from '@nestjs/common';
import { InspectionsService } from './inspections.service';
import { ApiResponse } from 'src/common/payload/ApiResponse';
import { CreateInspectionDTO } from 'src/common/dtos/inspections/create-inspection.dto';
import { Request } from 'express';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CustomExceptionFilter } from 'src/exceptions/CustomExceptionFilter';
import { CreateInspectionPlanDTO } from 'src/common/dtos/inspections/create-inspection-plan.dto';
import { Public } from 'src/decorators/public.decorator';
import { UUID } from 'crypto';

@Controller('inspections')
@ApiTags('inspections')
@ApiBearerAuth()
@UseFilters(CustomExceptionFilter) // Apply filter to the controller
export class InspectionsController {
  constructor(private inspectionsService: InspectionsService) {}

  @Post('inspection-records/create')
  async createInspectionRecords(
    @Body() dto: CreateInspectionDTO,
  ): Promise<ApiResponse> {
    return this.inspectionsService.create(dto);
  }
  @Public()
  @Post('inspection-plan/create')
  async createInspectionPlan(
    @Body() dto: CreateInspectionPlanDTO,
    @Req() request: Request,
  ): Promise<ApiResponse> {
    return this.inspectionsService.createInspectionPlan(request, dto);
  }

  @Get('plan/:planId')
  @Public()
  async getInspectionPlan(@Param('planId') planId: UUID): Promise<ApiResponse> {
    return new ApiResponse(
      true,
      'The inspection plan was retrieved successfully',
      await this.inspectionsService.getInspectionPlan(planId),
    );
  }
  @Get('categories/:categoryId')
  @Public()
  async getCategory(
    @Param('categoryId') categoryId: UUID,
  ): Promise<ApiResponse> {
    return new ApiResponse(
      true,
      'The category was retrieved successfully',
      await this.inspectionsService.getCategory(categoryId),
    );
  }

  @Get('categories/plan-id/:planId')
  @Public()
  async getCategoriesInspectionPlan(
    @Param('planId') planId: UUID,
  ): Promise<ApiResponse> {
    return new ApiResponse(
      true,
      'Categories were retrieved successfuly',
      await this.inspectionsService.getCategoriesInspectionPlan(planId),
    );
  }
  @Get('records/category-id/:categoryId')
  @Public()
  async getRecordsByCategory(
    @Param('categoryId') categoryId: UUID,
  ): Promise<ApiResponse> {
    return this.inspectionsService.getRecordsByCategory(categoryId);
  }
}
