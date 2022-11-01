import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class SignInDto {
    @ApiProperty({
        example: 'test',
        description: 'id를 입력 해 주세요'
    })
    @IsString()
    @IsNotEmpty()
    id: string

    @ApiProperty({
        example: '1234',
        description: 'password를 입력 해 주세요'
    })
    @IsString()
    @IsNotEmpty()
    psword: string
}