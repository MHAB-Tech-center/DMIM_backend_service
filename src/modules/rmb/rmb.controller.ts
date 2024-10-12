import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { UUID } from 'crypto';
import { CreateRMBStaffDTO } from './dtos/createRMBStaff.dto';
import { RmbService } from './rmb.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/utils/decorators/roles.decorator';
import { Public } from 'src/decorators/public.decorator';
import { ApiResponse } from 'src/common/payload/ApiResponse';
import { InviteUser } from 'src/common/dtos/invite-user.dto';

@Controller('rmb')
@ApiTags('rmb_members')
@ApiBearerAuth()
export class RmbController {
  constructor(private rmbService: RmbService) {}

  // Get all RMB members
  @Get('/all')
  async getAll() {
    return this.rmbService.getAll();
  }

  // Get RMB member by email without relations
  @Get('/find-by-email/:email')
  async getOneByEmail(@Param('email') email: string) {
    return await this.rmbService.getByEmail(email);
  }

  // Create a new RMB staff member
  @Post('/create')
  @Public()
  async create(@Body() body: CreateRMBStaffDTO) {
    return this.rmbService.create(body);
  }

  @Post('invite')
  @Roles('ADMIN')
  async inviteInspector(@Body() dto: InviteUser) {
    return new ApiResponse(
      true,
      'An RMB staff member was invited successfully',
      this.rmbService.inviteRMBStaffMember(dto),
    );
  }
  // Update an RMB member's details
  @Put('/update/:id')
  async update(@Param('id') id: UUID, @Body() dto: CreateRMBStaffDTO) {
    return this.rmbService.update(id, dto);
  }

  // Get RMB member by ID
  @Get('/by-id/:id')
  async getById(@Param('id') id: UUID) {
    return this.rmbService.getById(id);
  }

  // Delete an RMB member
  @Delete('/delete/:id')
  async delete(@Param('id') id: UUID) {
    this.rmbService.delete(id);
    return 'The RMB staff member was deleted successfully';
  }
}
