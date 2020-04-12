import {
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Injectable,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { Observable } from 'rxjs';
import { tap, map } from 'rxjs/operators';

export interface DataResponse<T> {
  data: T;
}

@Injectable()
export class TransformInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const http = context.switchToHttp();
    const request = http.getRequest<Request>();
    const response = http.getResponse<Response>();
    const method = request.method;
    return next.handle().pipe(
      tap(() => console.log('response handle run....')),
      map(data => ({ data })),
      tap(result => {
        console.log('result:', result);
        // if (method === 'POST') {
        //   response.json(result);
        // }
      }),
    );
  }
}
