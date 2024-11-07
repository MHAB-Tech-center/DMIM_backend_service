import { Body, Controller, Get, Param, Post, UseFilters } from '@nestjs/common';
import { MinesiteService } from './minesite.service';
import { CreateMineSiteDTO } from 'src/common/dtos/create-minesite.dto';
import { UUID } from 'crypto';
import { ApiResponse } from 'src/common/payload/ApiResponse';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CustomExceptionFilter } from 'src/exceptions/CustomExceptionFilter';
import { Public } from 'src/decorators/public.decorator';
import { Roles } from 'src/utils/decorators/roles.decorator';

@Controller('minesites')
@ApiTags('minesites')
@ApiBearerAuth()
@UseFilters(CustomExceptionFilter) // Apply filter to the controller
export class MinesiteController {
  constructor(private minesiteService: MinesiteService) {}
  @Post('create')
  @Roles('ADMIN')
  async create(@Body() dto: CreateMineSiteDTO): Promise<ApiResponse> {
    return this.minesiteService.create(dto);
  }
  @Post('update')
  @Roles('ADMIN')
  async update(
    @Param('id') id: UUID,
    @Body() dto: CreateMineSiteDTO,
  ): Promise<ApiResponse> {
    return this.minesiteService.update(id, dto);
  }
  @Get('all')
  @Public()
  async getAll() {
    return this.minesiteService.getAll();
  }
  @Get('/:id')
  async getById(@Param('id') id: UUID): Promise<any> {
    return this.minesiteService.getById(id);
  }
}
