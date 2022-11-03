import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class SignInDto {
    @ApiProperty({
        example: 'test',
        description: 'id를 입력해 주세요'
    })
    @IsString({message: 'id: 문자만 입력해 주세요.'})
    @IsNotEmpty({message: 'id를 입력해 주세요.'})
    id: string;

    @ApiProperty({
        example: '1234',
        description: 'password를 입력해 주세요'
    })
    @IsString({message: 'psword: 문자만 입력해 주세요.'})
    @IsNotEmpty({message: 'psword를 입력해 주세요.'})
    psword: string;
}