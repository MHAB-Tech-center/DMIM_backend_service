import { Injectable, NotFoundException } from '@nestjs/common';
import { extname } from 'path';
import { v4 as uuidv4 } from 'uuid';
import * as fs from 'fs';
import * as mkdirp from 'mkdirp';
import * as path from 'path';

@Injectable()
export class FilesService {
  async uploadFile(file: Express.Multer.File): Promise<string> {
    const uniqueFileName = this.generateUniqueFileName(file);
    const filePath = `uploads/${uniqueFileName}`;
    // Check if the 'uploads' directory exists, and create it if it doesn't
    await this.ensureUploadsDirectoryExists();

    // Write the file to the specified path
    fs.writeFileSync(filePath, file.buffer);

    return uniqueFileName;
  }
  async uploadArrayOfFiles(files: Express.Multer.File[]): Promise<string> {
    const uniqueName = this.generateUniqueFileName(files[0]);
    const filePath = `uploads/${uniqueName}`;

    await this.ensureUploadsDirectoryExists();
    fs.writeFileSync(filePath, files[0].buffer);
    return uniqueName;
  }

  async deleteFile(fileName: string): Promise<void> {
    const filePath = `uploads/${fileName}`;
    try {
      fs.unlinkSync(filePath);
    } catch (error) {
      if (error.code === 'ENOENT') {
        // File does not exist, handle or log this case as needed
        throw new NotFoundException('File not found');
      } else {
        // Handle other errors, e.g., permission issues
        throw error;
      }
    }
  }

  async updateFile(
    currentFileName: string,
    newFile: Express.Multer.File,
  ): Promise<string> {
    await this.deleteFile(currentFileName); // Delete the existing file
    return this.uploadFile(newFile); // Upload the new file
  }

  private generateUniqueFileName(file: Express.Multer.File): string {
    const fileExt = extname(file.originalname);
    return `${uuidv4()}${fileExt}`;
  }

  private async ensureUploadsDirectoryExists() {
    const directoryPath = 'uploads';

    // Check if the directory exists, and create it if it doesn't
    try {
      await mkdirp(directoryPath);
    } catch (error) {
      // Handle any errors that occur during directory creation
      return new Error(error);
    }
  }

  async getFile(filename: string): Promise<string | null> {
    const fileLocation = path.join(__dirname, 'uploads', filename); // Specify the path to your uploads folder

    return new Promise((resolve) => {
      // Check if the file exists asynchronously
      fs.access(fileLocation, fs.constants.F_OK, (err) => {
        if (err) {
          resolve(null); // File does not exist
        } else {
          resolve(fileLocation); // File exists
        }
      });
    });
  }
}
