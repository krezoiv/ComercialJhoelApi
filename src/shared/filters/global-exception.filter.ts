import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import { BadRequestException } from '@nestjs/common';

import { ValidationError } from '../errors/validation-error';
import { NotFoundError } from '../errors/not-found-error';
import { DomainError } from '../errors/domain-error';
import { ConflictError } from '../errors/conflict-error';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    if (exception instanceof BadRequestException) {
      const responseBody = exception.getResponse() as unknown as {
        message: string | string[];
      };

      return response.status(HttpStatus.BAD_REQUEST).json({
        statusCode: 400,

        message: Array.isArray(responseBody.message)
          ? responseBody.message[0]
          : responseBody.message,
      });
    }
    if (exception instanceof ValidationError) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        statusCode: 400,
        message: exception.message,
      });
    }

    if (exception instanceof ConflictError) {
      return response.status(HttpStatus.CONFLICT).json({
        statusCode: 409,
        message: exception.message,
      });
    }

    if (exception instanceof NotFoundError) {
      return response.status(HttpStatus.NOT_FOUND).json({
        statusCode: 404,
        message: exception.message,
      });
    }

    if (exception instanceof DomainError) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        statusCode: 400,
        message: exception.message,
      });
    }

    console.error(exception);

    return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      statusCode: 500,
      message: 'Internal server error',
    });
  }
}
