import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class RefreshDto {
    @ApiProperty({
        example: 'test',
        description: 'id를 입력 해 주세요'
    })
    @IsString()
    @IsNotEmpty()
    id: string;
}