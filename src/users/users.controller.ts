import { Controller, Param, Post } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService){}

    @Post(':id/:psword')
    async signIn(@Param() userInfo) {
        try {
            const response = await this.usersService.signIn(userInfo);

            return response;
        } catch (err) {
            throw err;
        }
    }
}
