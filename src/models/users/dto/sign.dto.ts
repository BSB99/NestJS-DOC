import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, Matches } from "class-validator";

export class SignDto {
    @ApiProperty({
        example: 'test@naver.com',
        description: 'email를 입력해 주세요'
    })
    @IsEmail({message: 'email 형식에 맞게 입력해 주세요.'})
    email: string;

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