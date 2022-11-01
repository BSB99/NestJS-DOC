import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from "@nestjs/common";
import { HttpArgumentsHost } from "@nestjs/common/interfaces";
import { Response, Request } from 'express';
import { errorObj } from "src/public/error-code";
import { ErrorObj } from "./error.interface";

@Catch(HttpException)
export class HttpErrorExceptionFilter implements ExceptionFilter {
    catch(exception: HttpErrorExceptionFilter, host: ArgumentsHost) {
        const ctx: HttpArgumentsHost = host.switchToHttp();
        const response: Response = ctx.getResponse<Response>();
        const request: Request = ctx.getRequest<Request>();
        const status = exception instanceof HttpException ? exception.getStatus() : 500;
        
        const error = exception instanceof HttpException
        ? exception.getResponse() as ErrorObj
        : {
            success: false,
            statusCode: status,
            error: {
                code: 1500,
                message: errorObj[1500]
            },
            message: errorObj[status],
        };

        const code = error.message;

        return response.status(status).json({
            success: false,
            statusCode: status,
            error: {
                code,
                message: errorObj[code],
            }   
        });
    }
}