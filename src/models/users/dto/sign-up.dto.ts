import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";

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
    password: string;

    @ApiProperty({
        example: 'name',
        description: '이름을 입력해 주세요'
    })
    @IsString({message: 'name: 문자만 입력해 주세요.'})
    @IsNotEmpty({message: 'name를 입력해 주세요.'})
    name: string;
}