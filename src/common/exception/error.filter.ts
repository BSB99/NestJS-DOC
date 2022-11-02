import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from "@nestjs/common";
import { HttpArgumentsHost } from "@nestjs/common/interfaces";
import { Response, Request } from 'express';
import { errorObj } from "src/public/error-code";
import { ErrorObj } from "../interface/error.interface";

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

        const errInfo = error.message;

        if (typeof(errInfo) === "object") {
            if (errInfo.length >= 2 && typeof(errInfo) === "object") {
                const code = 1055
                return response.status(status).json({
                    success: false,
                    statusCode: status,
                    error: {
                        code: code,
                        message: errorObj[code],
                    }   
                });
            }
            return response.status(status).json({
                success: false,
                statusCode: status,
                error: {
                    code: 1056,
                    message: errInfo[0],
                }   
            });
        }

        return response.status(status).json({
            success: false,
            statusCode: status,
            error: {
                code: errInfo,
                message: errorObj[errInfo],
            }   
        });
    }
}