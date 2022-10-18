import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsString } from "class-validator";

export class UpdateSchoolDto {
    @ApiProperty({
      example: '학교',
      description: '학교를 입력 해 주세요'
    })  
    @IsString()
    name: string;
  }