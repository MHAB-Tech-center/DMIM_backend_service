import { Injectable } from '@nestjs/common';
import { UploadApiErrorResponse, UploadApiResponse, v2 } from 'cloudinary';
import toStream = require('buffer-to-stream');
import { extname } from 'path';
@Injectable()
export class CloudinaryService {
  private generateFileName(originalName: string): string {
    const timestamp = Date.now();
    const fileExtension = extname(originalName);
    const baseName = originalName.replace(/\.[^/.]+$/, '');

    return `${baseName}_${timestamp}`;
  }
  async uploadImage(
    file: Express.Multer.File,
  ): Promise<UploadApiResponse | UploadApiErrorResponse> {
    const customFileName = this.generateFileName(file.originalname);
    return new Promise((resolve, reject) => {
      const upload = v2.uploader.upload_stream(
        { folder: 'kabstore/products', public_id: customFileName },
        (error, result) => {
          if (error) return reject(error);
          resolve(result);
        },
      );

      toStream(file.buffer).pipe(upload);
    });
  }
}
