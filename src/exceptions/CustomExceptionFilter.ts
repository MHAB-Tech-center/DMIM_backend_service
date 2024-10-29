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
import { TokenExpiredError } from '@nestjs/jwt';
import { Response } from 'express';

@Catch()
export class CustomExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    console.log(exception);

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
      message = exception.message;
    } else if (exception instanceof HttpException) {
      status = exception.getStatus();
    } else if (exception instanceof TokenExpiredError) {
      status = 401;
      message = exception.message;
    }

    response.status(status).json({
      success: false,
      message: message,
      data: null,
    });
  }
}
