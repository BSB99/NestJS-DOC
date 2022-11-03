import { Body, Controller, Param, ParseIntPipe, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { SignInDto } from './dto/sign-in.dto';
import { UsersService } from './users.service';


@ApiTags('users')
@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService){}

    @ApiOperation({ summary: 'Token 발급 API', description: 'Token 발급'})
    @Post()
    async signIn(@Body() signInDto: SignInDto) {
        try {
            console.log(signInDto);
            const response:object = await this.usersService.signIn(signInDto);

            return response;
        } catch (err) {
            throw err;
        }
    }
}
