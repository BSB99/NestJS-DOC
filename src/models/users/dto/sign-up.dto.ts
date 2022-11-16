import { ApiProperty } from "@nestjs/swagger";
import { Length } from "class-validator";
import { SignDto } from "./sign.dto";

export class SignUpDto extends SignDto {
    @ApiProperty({
        example: 'name',
        description: '이름을 입력해 주세요'
    })
    @Length(1, 8, {message: 'name: 1자 ~ 8자'})
    name: string;
}