import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString, Length, Matches } from "class-validator";

export class SignInDto {
    @ApiProperty({
        example: 'test',
        description: 'id를 입력해 주세요'
    })
    @Length(3, 16, {message: 'id: 3자 ~ 16자'})
    id: string;

    @ApiProperty({
        example: '1234',
        description: 'password를 입력해 주세요'
    })
    @Matches( /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{10,20}$/,
    {
    message: '비밀번호 양식에 맞춰 작성해 주세요.(최소 하나의 숫자/대문자/소문자/특수문자) , 10자 ~ 20자)'
    })
    password: string;
}