import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString, Matches } from "class-validator";

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
    @IsString({message: 'password: 문자만 입력해 주세요.'})
    @IsNotEmpty({message: 'password를 입력해 주세요.'})
    @Matches( /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
    {
    message: '비밀번호 양식에 맞춰 작성해 주세요.(숫자/대문자/소문자/특수문자) , 최소 8자)'
    })
    password: string;
}