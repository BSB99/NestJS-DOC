import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

// Null 이 들어오면 빈 문자열로 대체 해주는 인터셉터 로직

@Injectable()
export class ExcludeNullInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next
    .handle()
    .pipe(map(value => value === null ? '' : value ));
    
  }
}
