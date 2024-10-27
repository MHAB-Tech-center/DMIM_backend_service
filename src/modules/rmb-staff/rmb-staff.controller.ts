import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Query,
  UploadedFile,
  UseFilters,
  UseInterceptors,
} from '@nestjs/common';
import { RMBStaffService } from './rmb-staff.service';
import { ApiResponse } from 'src/common/payload/ApiResponse';
import { UUID } from 'crypto';
import { CreateRMBRoleDTO } from './dtos/create-rmb-role.dto';
import { ApiConsumes, ApiQuery, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { Public } from 'src/decorators/public.decorator';
import { CreateRMBStaffDTO } from '../rmb/dtos/createRMBStaff.dto';
import { InviteUser } from 'src/common/dtos/invite-user.dto';
import { CustomExceptionFilter } from 'src/exceptions/CustomExceptionFilter';

@Controller('rmb-staff')
@ApiTags('rmb-staff')
@UseFilters(CustomExceptionFilter) // Apply filter to the controller
export class RmbStaffController {
  constructor(private rmbStaffService: RMBStaffService) {}

  @Post()
  @UseInterceptors(FileInterceptor('picture'))
  @ApiConsumes('multipart/form-data')
  @Public()
  async create(
    @Body() body: CreateRMBStaffDTO,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<ApiResponse> {
    return new ApiResponse(
      true,
      `Thank you for setting up your profile, go and login`,
      await this.rmbStaffService.create(body, file),
    );
  }
  @Post('invite')
  @Public()
  // @Roles('ADMIN')
  async inviteInspector(@Body() dto: InviteUser): Promise<ApiResponse> {
    return new ApiResponse(
      true,
      "We have sent an invitation link to the registered RMB staff member's email",
      await this.rmbStaffService.inviteRMBStaffMember(dto),
    );
  }

  @Get('all/by-status')
  @ApiQuery({ name: 'status', required: true, example: 'pending' })
  async findByStatus(@Query('status') status: string): Promise<ApiResponse> {
    return new ApiResponse(
      true,
      'The rmb staff member was retrieved successfully',
      await this.rmbStaffService.findByStatus(status),
    );
  }
  @Get('all')
  async getAll(): Promise<ApiResponse> {
    return new ApiResponse(
      true,
      'All rmb staff members were retrieved successfully',
      await this.rmbStaffService.getAll(),
    );
  }
  @Get('all/pending')
  async getAllPending(): Promise<ApiResponse> {
    return new ApiResponse(
      true,
      'All rmb pending staff members were retrieved successfully',
      await this.rmbStaffService.getAllPending(),
    );
  }
  @Get('all/active')
  async getAllActive(): Promise<ApiResponse> {
    return new ApiResponse(
      true,
      'All rmb active staff members were retrieved successfully',
      await this.rmbStaffService.getAllActive(),
    );
  }

  @Get('/:id')
  async findById(@Param('id') id: UUID): Promise<ApiResponse> {
    return new ApiResponse(
      true,
      'All rmb pending staff members were retrieved successfully',
      await this.rmbStaffService.findById(id),
    );
  }

  @Get('by-profile')
  @ApiQuery({ name: 'userId', required: true })
  async findByUser(@Query('userId') userId: UUID): Promise<ApiResponse> {
    return new ApiResponse(
      true,
      'All rmb staff members were retrieved successfully',
      await this.rmbStaffService.findByUser(userId),
    );
  }
  @Delete('/:id')
  async delete(@Param('id') id: UUID): Promise<ApiResponse> {
    return new ApiResponse(
      true,
      'RMB staff member was deleted successfully',
      await this.rmbStaffService.delete(id),
    );
  }
  @Post('/roles/create')
  async addRMBRole(@Body() dto: CreateRMBRoleDTO): Promise<ApiResponse> {
    return new ApiResponse(
      true,
      'The RMB role was created successfully',
      await this.rmbStaffService.addRMBRole(
        dto.roleName,
        dto.roleDescription,
        dto.featureIds,
      ),
    );
  }
  @Get('roles/all')
  async getAllRMBRoles(): Promise<ApiResponse> {
    return new ApiResponse(
      true,
      'All RMB roles were retrieved successfully',
      await this.rmbStaffService.getAllRMBRoles(),
    );
  }

  @Put('roles/update/:id')
  async updateRMBRole(
    @Body() dto: CreateRMBRoleDTO,
    @Param('id') id: UUID,
  ): Promise<ApiResponse> {
    return new ApiResponse(
      true,
      'The RMB role was updated successfully',
      await this.rmbStaffService.updateRMBRole(
        id,
        dto.roleName,
        dto.roleDescription,
        dto.featureIds,
      ),
    );
  }
  @Delete('roles/delete/:id')
  async deleteRMBRole(@Param('id') id: UUID): Promise<ApiResponse> {
    return new ApiResponse(
      true,
      'The RMB role was deleted successfully',
      await this.rmbStaffService.delete(id),
    );
  }
  @Put('assign-roles')
  @ApiQuery({ name: 'rmbRoleId', required: true })
  @ApiQuery({ name: 'rmbStaffId', required: true })
  async assignRMBRole(
    @Query('rmbRoleId') rmbRoleId: string,
    @Query('rmbStaffId') rmbStaffId: string,
  ): Promise<ApiResponse> {
    return new ApiResponse(
      true,
      'The roles have been assigned successfully',
      await this.rmbStaffService.assignRMBRole(rmbRoleId, rmbStaffId),
    );
  }
  @Put('roles/update/:id')
  async updateRMBStaffRole(
    rmbRoleId: string,
    rmbStaffId: string,
  ): Promise<ApiResponse> {
    return new ApiResponse(
      true,
      'The RMB staff role was updated successfully',
      await this.rmbStaffService.updateRMBStaffRole(rmbRoleId, rmbStaffId),
    );
  }

  @Patch('dissociate-role')
  @ApiQuery({ name: 'rmbStaffId', required: true })
  async dissociateRMBRole(
    @Query('rmbStaffId') rmbStaffId: UUID,
  ): Promise<ApiResponse> {
    return new ApiResponse(
      true,
      'The role has been dissociated successfuly',
      await this.rmbStaffService.dissociateRMBRole(rmbStaffId),
    );
  }
}
