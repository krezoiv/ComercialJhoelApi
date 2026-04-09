import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpStatus,
  HttpException,
  BadRequestException,
  ForbiddenException,
  UnauthorizedException,
} from '@nestjs/common';
import { Response } from 'express';

import { ValidationError } from '../errors/validation-error';
import { NotFoundError } from '../errors/not-found-error';
import { DomainError } from '../errors/domain-error';
import { ConflictError } from '../errors/conflict-error';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    // ============================================
    // 🔥 1. AUTH / SECURITY (PRIORIDAD ALTA)
    // ============================================

    if (exception instanceof UnauthorizedException) {
      return response.status(HttpStatus.UNAUTHORIZED).json({
        statusCode: 401,
        message: 'No autenticado, token inválido o expirado',
      });
    }

    if (exception instanceof ForbiddenException) {
      return response.status(HttpStatus.FORBIDDEN).json({
        statusCode: 403,
        message: 'No tienes permisos para acceder a este recurso',
      });
    }

    // ============================================
    // 🔥 2. VALIDACIONES HTTP
    // ============================================

    if (exception instanceof BadRequestException) {
      const responseBody = exception.getResponse() as {
        message: string | string[];
      };

      return response.status(HttpStatus.BAD_REQUEST).json({
        statusCode: 400,
        message: Array.isArray(responseBody.message)
          ? responseBody.message[0]
          : responseBody.message,
      });
    }

    // ============================================
    // 🔥 3. ERRORES DE DOMINIO (DDD)
    // ============================================

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

    // ============================================
    // 🔥 4. ERRORES HTTP GENERALES (Nest)
    // ============================================

    if (exception instanceof HttpException) {
      const status = exception.getStatus();
      const res = exception.getResponse();

      return response.status(status).json(
        typeof res === 'string'
          ? {
              statusCode: status,
              message: res,
            }
          : res,
      );
    }

    // ============================================
    // 🔥 5. ERROR DESCONOCIDO (FALLBACK)
    // ============================================

    console.error('UNHANDLED ERROR:', exception);

    return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      statusCode: 500,
      message: 'Internal server error',
    });
  }
}
