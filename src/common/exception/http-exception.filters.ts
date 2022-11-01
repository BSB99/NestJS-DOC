import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from "@nestjs/common";
import { Request, Response } from 'express';

// 에러가 발생할 시 넘겨주는 예외 필터
// 클래스를 사용하여 필터를 적용하는 것이 메모리 사용량을 줄인다.
@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
 /* 
 exception -> 현재 처리중인 예외 개체 
 host -> 접근하려는 위치에 매개변수로 참조되는 ArgumentsHost의 인스턴스 제공
 */
 catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();
    
    response.status(status)
    .json({
        statusCode: status,
        timestamp: new Date().toISOString(),
        path: request.url
    });
 }
}

