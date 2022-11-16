import { ApiProperty } from "@nestjs/swagger";
import { IsEmail } from "class-validator";

export class RefreshDto {
    @ApiProperty({
        example: 'test@naver.com',
        description: 'email를 입력해 주세요'
    })
    @IsEmail({message: 'email 형식에 맞게 입력해 주세요.'})
    email: string;
}