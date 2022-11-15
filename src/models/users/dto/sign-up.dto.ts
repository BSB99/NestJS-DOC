import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString, Matches } from "class-validator";

export class SignUpDto {
    @ApiProperty({
        example: 'test@naver.com',
        description: 'email를 입력해 주세요'
    })
    @IsEmail({message: 'email 형식에 맞게 입력해 주세요.'})
    @IsNotEmpty({message: 'email을 입력해 주세요.'})
    email: string;

    @ApiProperty({
        example: 'test',
        description: 'id를 입력해 주세요'
    })
    @IsString({message: 'id: 문자만 입력해 주세요.',})
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

    @ApiProperty({
        example: 'name',
        description: '이름을 입력해 주세요'
    })
    @IsString({message: 'name: 문자만 입력해 주세요.'})
    @IsNotEmpty({message: 'name를 입력해 주세요.'})
    name: string;
}