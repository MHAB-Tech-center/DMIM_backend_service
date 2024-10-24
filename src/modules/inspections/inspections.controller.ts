import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Query,
  Req,
  UseFilters,
} from '@nestjs/common';
import { InspectionsService } from './inspections.service';
import { ApiResponse } from 'src/common/payload/ApiResponse';
import { CreateInspectionDTO } from 'src/common/dtos/inspections/create-inspection.dto';
import { Request } from 'express';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';
import { CustomExceptionFilter } from 'src/exceptions/CustomExceptionFilter';
import { CreateInspectionPlanDTO } from 'src/common/dtos/inspections/create-inspection-plan.dto';
import { Public } from 'src/decorators/public.decorator';
import { UUID } from 'crypto';
import { EditInspectionRecordDTO } from 'src/common/dtos/inspections/edit-inspection.dto';
import { EditManyInspectionRecordsDTO } from 'src/common/dtos/inspections/edit-many-inspections-records.dto';
import { ReviewInspectionPlanDTO } from 'src/common/dtos/inspections/review-inspection-plan.dto';

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
  @Put('/records/update')
  async editInspectionRecord(@Body() dto: EditInspectionRecordDTO) {
    return new ApiResponse(
      true,
      'The inspection record was updated successfully',
      await this.inspectionsService.editInspectionRecord(dto),
    );
  }
  @Put('/records/update-bulk')
  async editManyInspectionRecords(@Body() dto: EditManyInspectionRecordsDTO) {
    return new ApiResponse(
      true,
      'All records were updated successfully',
      await this.inspectionsService.editManyInspectionRecords(dto),
    );
  }

  @Put('review/')
  @Public()
  async reviewInspectionPlan(@Body() dto: ReviewInspectionPlanDTO) {
    return new ApiResponse(
      true,
      'The inspection plan was reviewed successfully',
      await this.inspectionsService.reviewInspectionPlan(dto),
    );
  }
  @Put('all/by-status')
  @ApiQuery({ name: 'status', required: true, example: 'submitted' })
  async getInspectionPlanByStatus(
    @Query('status') status: string = 'submitted',
  ) {
    return new ApiResponse(
      true,
      'The inspection plan were retrieved successfully',
      await this.inspectionsService.getInspectionPlanByStatus(status),
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
    return await this.inspectionsService.getRecordsByCategory(categoryId);
  }
  @Get('/plans/all')
  @Public()
  async getAllInspectionPlans() {
    return new ApiResponse(
      true,
      'All inspection plans were retrieved successfully',
      await this.inspectionsService.findAll(),
    );
  }
}
