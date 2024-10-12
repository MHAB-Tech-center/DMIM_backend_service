import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { InspectorsService } from './inspectors.service';
import { CreateRMBStaffDTO } from '../rmb/dtos/createRMBStaff.dto';
import { UUID } from 'crypto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Public } from 'src/decorators/public.decorator';
import { Roles } from 'src/utils/decorators/roles.decorator';
import { InviteUser } from 'src/common/dtos/invite-user.dto';
import { ApiResponse } from 'src/common/payload/ApiResponse';

@Controller('inspectors')
@ApiTags('inspectors')
@ApiBearerAuth()
export class InspectorsController {
  constructor(private inspectorService: InspectorsService) {}

  // Get all inspector
  @Get('/all')
  async getAll() {
    return this.inspectorService.getAll();
  }

  // Get inspector by email without relations
  @Get('/find-by-email/:email')
  async getOneByEmail(@Param('email') email: string) {
    return await this.inspectorService.getByEmail(email);
  }

  // Create a new inspector
  @Public()
  async create(@Body() body: CreateRMBStaffDTO) {
    return this.inspectorService.create(body);
  }

  // Update an inspector's details
  @Put('/update/:id')
  @Roles('INSPECTOR', 'ADMIN')
  async update(@Param('id') id: UUID, @Body() dto: CreateRMBStaffDTO) {
    return new ApiResponse(
      true,
      'An inspector was updated successfully',
      this.inspectorService.update(id, dto),
    );
  }
  @Post('invite')
  @Roles('ADMIN')
  async inviteInspector(@Body() dto: InviteUser) {
    return new ApiResponse(
      true,
      'An inspector was invited successfully',
      this.inspectorService.inviteInspector(dto),
    );
  }

  // Get inspector by ID
  @Get('/by-id/:id')
  async getById(@Param('id') id: UUID) {
    return this.inspectorService.getById(id);
  }

  // Delete an inspector
  @Delete('/delete/:id')
  async delete(@Param('id') id: UUID) {
    this.inspectorService.delete(id);
    return 'The RMB staff member was deleted successfully';
  }
}
