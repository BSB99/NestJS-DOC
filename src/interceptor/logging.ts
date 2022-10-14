import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { Observable, tap } from "rxjs";

// 인터셉터를 사용하여 사용자 상호작용 기록
@Injectable()
export class LoggingInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
        console.log('Before...');

        const now = Date.now();
        return next
        .handle()
        .pipe(
            // tap() -> 예외적인 종료 시 익명 로깅 기능 호출, 응답 주기 방해X
            tap(() => console.log(`After... ${Date.now() - now}ms`)),
        );
    }
}