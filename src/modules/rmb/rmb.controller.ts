import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UploadedFile,
  UseFilters,
  UseInterceptors,
} from '@nestjs/common';
import { UUID } from 'crypto';
import { CreateRMBStaffDTO } from './dtos/createRMBStaff.dto';
import { RmbService } from './rmb.service';
import { ApiBearerAuth, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/utils/decorators/roles.decorator';
import { Public } from 'src/decorators/public.decorator';
import { ApiResponse } from 'src/common/payload/ApiResponse';
import { InviteUser } from 'src/common/dtos/invite-user.dto';
import { CustomExceptionFilter } from 'src/exceptions/CustomExceptionFilter';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('rmb')
@ApiTags('rmb_members')
@ApiBearerAuth()
@UseFilters(CustomExceptionFilter) // Apply filter to the controller
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
  @UseInterceptors(FileInterceptor('picture'))
  @ApiConsumes('multipart/form-data')
  async create(
    @Body() body: CreateRMBStaffDTO,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.rmbService.create(body, file);
  }

  @Post('invite')
  @Roles('ADMIN')
  async inviteInspector(@Body() dto: InviteUser) {
    return this.rmbService.inviteRMBStaffMember(dto);
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
  async delete(@Param('id') id: UUID): Promise<ApiResponse> {
    return this.rmbService.delete(id);
  }
}
