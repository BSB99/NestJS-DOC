import { Body, Controller, Get, Param, ParseIntPipe, Post, Query } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { SignInDto, Test } from './dto/sign-in.dto';
import { UsersService } from './users.service';


@ApiTags('users')
@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService){}

    @ApiOperation({ summary: 'Token 발급 API', description: 'Token 발급'})
    @Post()
    async signIn(@Body() signInDto: SignInDto) {
        try {
            const response:object = await this.usersService.signIn(signInDto);

            return response;
        } catch (err) {
            throw err;
        }
    }

    @Get()
    async test(@Query() custom: Test) {
        return custom;
    }
}
