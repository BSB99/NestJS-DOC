import { BadRequestException, GoneException, InternalServerErrorException, UnauthorizedException } from "@nestjs/common";

export class ErrorCustoms {
    tokenError(err) {
        switch (err.message) {
            case 'INVALID_TOKEN':
            case 'TOKEN_IS_ARRAY':
            case 'NO_USER':
                throw new UnauthorizedException(1003);
    
            case 'invalid signature':
                throw new BadRequestException(1004);
    
            case 'jwt expired':
                throw new GoneException(1010);
            
            default:
                throw new InternalServerErrorException(1500);
        }
    }
}

