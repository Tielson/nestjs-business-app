import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { Request, Response } from 'express';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception instanceof HttpException
      ? exception.getStatus()
      : HttpStatus.INTERNAL_SERVER_ERROR;

    let message: any;
    if (exception instanceof HttpException) {
      message = exception.getResponse();
    } else if (exception instanceof Prisma.PrismaClientValidationError) {
      message = {
        name: exception.name,
        clientVersion: exception.clientVersion,
        message: exception.message,
      };
    } else {
      message = {
        name: (exception as any).name,
        message: (exception as any).message,
      };
    }

    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      message: message,
    });
  }
}