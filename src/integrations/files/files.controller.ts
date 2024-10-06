import {
  BadRequestException,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
  UseInterceptors,
  UploadedFile,
  Delete,
  Patch,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { FilesService } from './files.service';
import { Res } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Public } from 'src/decorators/public.decorator';

@Controller('files')
@ApiTags('files')
export class FilesController {
  constructor(private readonly fileService: FilesService) {}

  @Public()
  @Get(':filename')
  @Public()
  serveFile(@Param('filename') filename, @Res() res) {
    const fileLocation = this.fileService.getFile(filename);
    if (!fileLocation || fileLocation == null) {
      return new NotFoundException('File not found');
    }

    return res.sendFile(filename, { root: 'uploads' });
  }

  @Post('/upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    const fileName = await this.fileService.uploadFile(file);
    if (!fileName || fileName == null) {
      return new BadRequestException(
        'File not uploaded try again with the file tag',
      );
    }
    return {
      message: 'File uploaded successfully',
      filename: fileName,
    };
  }

  @Delete('/delete/:filename')
  async deleteFile(@Param('filename') filename) {
    const fileLocation = this.fileService.getFile(filename);
    if (!fileLocation || fileLocation == null) {
      return new NotFoundException('File not found');
    }
    await this.fileService.deleteFile(filename);
    return {
      message: 'File deleted successfully',
    };
  }

  @Patch('/update/:filename')
  @UseInterceptors(FileInterceptor('file'))
  async updateFile(
    @Param('filename') filename,
    @Res() res,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const fileLocation = this.fileService.getFile(filename);
    if (!fileLocation || fileLocation == null) {
      return new NotFoundException('File not found');
    }
    const fileName = await this.fileService.updateFile(filename, file);
    if (!fileName || fileName == null) {
      return new BadRequestException(
        'File not uploaded try again with the file tag',
      );
    }
    return {
      message: 'File uploaded successfully',
      filename: fileName,
    };
  }
}
