import { Body, Controller, Get, Param, Post, UseFilters } from '@nestjs/common';
import { MinesiteService } from './minesite.service';
import { CreateMineSiteDTO } from 'src/common/dtos/create-minesite.dto';
import { UUID } from 'crypto';
import { ApiResponse } from 'src/common/payload/ApiResponse';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CustomExceptionFilter } from 'src/exceptions/CustomExceptionFilter';

@Controller('minesites')
@ApiTags('minesites')
@ApiBearerAuth()
@UseFilters(CustomExceptionFilter) // Apply filter to the controller
export class MinesiteController {
  constructor(private minesiteService: MinesiteService) {}
  @Post('create')
  async create(@Body() dto: CreateMineSiteDTO): Promise<ApiResponse> {
    return this.minesiteService.create(dto);
  }
  @Post('update')
  async update(
    @Param('id') id: UUID,
    @Body() dto: CreateMineSiteDTO,
  ): Promise<ApiResponse> {
    return this.minesiteService.update(id, dto);
  }
  @Get('/:id')
  async getById(@Param('id') id: UUID): Promise<any> {
    return this.minesiteService.getById(id);
  }
}
