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
import { InspectorsService } from './inspectors.service';
import { CreateRMBStaffDTO } from '../rmb/dtos/createRMBStaff.dto';
import { UUID } from 'crypto';
import { ApiBearerAuth, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { Public } from 'src/decorators/public.decorator';
import { Roles } from 'src/utils/decorators/roles.decorator';
import { InviteUser } from 'src/common/dtos/invite-user.dto';
import { ApiResponse } from 'src/common/payload/ApiResponse';
import { CustomExceptionFilter } from 'src/exceptions/CustomExceptionFilter';
import { CreateInspectorDTO } from './dtos/createInspector.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('inspectors')
@ApiTags('inspectors')
@ApiBearerAuth()
@UseFilters(CustomExceptionFilter) // Apply filter to the controller
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
  @Post()
  @UseInterceptors(FileInterceptor('picture'))
  @ApiConsumes('multipart/form-data')
  @Public()
  async create(
    @Body() body: CreateInspectorDTO,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.inspectorService.create(body, file);
  }

  // Update an inspector's details
  @Put('/update/:id')
  @Roles('INSPECTOR', 'ADMIN')
  async update(@Param('id') id: UUID, @Body() dto: CreateInspectorDTO) {
    return new ApiResponse(
      true,
      'An inspector was updated successfully',
      this.inspectorService.update(id, dto),
    );
  }
  @Post('invite')
  @Public()
  // @Roles('ADMIN')
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
