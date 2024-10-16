import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  NotFoundException,
  UnauthorizedException,
  BadRequestException,
} from '@nestjs/common';
import { Response } from 'express';

@Catch()
export class CustomExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    let status = HttpStatus.INTERNAL_SERVER_ERROR; // Default status code
    let message: any = 'Internal server error'; // Default message
    if (exception.response) {
      message = exception.response.message;
    } else {
      message = exception.message;
    }
    if (exception instanceof NotFoundException) {
      status = HttpStatus.NOT_FOUND;
    } else if (exception instanceof BadRequestException) {
      status = HttpStatus.BAD_REQUEST;
    } else if (exception instanceof UnauthorizedException) {
      status = HttpStatus.UNAUTHORIZED;
      message = 'You are not allowed to access this resource';
    } else if (exception instanceof HttpException) {
      status = exception.getStatus();
    }

    response.status(status).json({
      success: false,
      message: message,
      data: null,
    });
  }
}
