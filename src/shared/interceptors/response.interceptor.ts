import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { InterceptorResponse } from '../types/interceptor-response';

@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor<T, unknown> {
  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    return next.handle().pipe(
      map((response: InterceptorResponse<T> | T) => {
        // 🔥 si viene con data/meta
        if (
          typeof response === 'object' &&
          response !== null &&
          'data' in response
        ) {
          const res = response;

          return {
            success: true,
            message: 'Request successful',
            data: res.data,
            meta: res.meta,
          };
        }

        // 🔥 si solo viene data
        return {
          success: true,
          message: 'Request successful',
          data: response,
        };
      }),
    );
  }
}
