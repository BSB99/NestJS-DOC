import { Injectable, NestMiddleware } from "@nestjs/common";
import { NextFunction } from "express";

// 기능적 미들웨어
export function LoggerMiddleware(req: Request, res: Response, next: NextFunction) {
    console.log('Request..');
    next();
}

/*

클래스 기반 미들웨어

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: NextFunction) {
        console.log('Request...');
        next();
    }
}
*/
