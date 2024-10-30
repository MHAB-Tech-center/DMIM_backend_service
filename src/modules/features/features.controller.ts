import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseFilters,
} from '@nestjs/common';
import { SystemFeatureService } from './features.service';
import { ApiResponse } from 'src/common/payload/ApiResponse';
import { CreateSystemFeatureDTO } from './dtos/create-feature.dto';
import { UUID } from 'crypto';
import { CreateMultipleFeaturesDTO } from './dtos/ceratee-features.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CustomExceptionFilter } from 'src/exceptions/CustomExceptionFilter';
import { Public } from 'src/decorators/public.decorator';
@Controller('features')
@ApiBearerAuth()
@ApiTags('features')
@UseFilters(CustomExceptionFilter)
export class FeaturesController {
  constructor(private featureService: SystemFeatureService) {}
  @Get('all')
  @Public()
  async getSystemFeatures(): Promise<ApiResponse> {
    return new ApiResponse(
      true,
      'All features were retrieved successfully',
      await this.featureService.getSystemFeatures(),
    );
  }
  @Post('create-bulk')
  async createMultipleSystemFeatures(
    @Body() dto: CreateMultipleFeaturesDTO,
  ): Promise<ApiResponse> {
    return new ApiResponse(
      true,
      'Multiple features were created successfully',
      await this.featureService.createMultipleSystemFeatures(dto),
    );
  }
  @Post('create')
  async createSystemFeature(
    @Body() dto: CreateSystemFeatureDTO,
  ): Promise<ApiResponse> {
    return new ApiResponse(
      true,
      'The system feature was created successfully',
      await this.featureService.createSystemFeature(dto),
    );
  }
  @Put('update/:id')
  async updateSystemFeature(
    @Param('id') id: UUID,
    @Body() dto: CreateSystemFeatureDTO,
  ): Promise<ApiResponse> {
    return new ApiResponse(
      true,
      'The system feature was uploaded successfully',
      await this.featureService.updateSystemFeature(id, dto),
    );
  }
  @Delete('delete/:id')
  async deleteSystemFeature(@Param('id') id: UUID): Promise<ApiResponse> {
    return new ApiResponse(
      true,
      'system featuree was retrieved successfully',
      await this.featureService.deleteSystemFeature(id),
    );
  }
}
