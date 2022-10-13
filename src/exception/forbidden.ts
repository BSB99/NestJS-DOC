import { HttpException, HttpStatus } from "@nestjs/common";

// 사용자 정의 예외 필터
export class ForbiddenException extends HttpException {
    constructor() {
        super('Forbidden', HttpStatus.FORBIDDEN)
    }
} 