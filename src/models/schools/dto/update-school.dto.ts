import { ApiProperty } from "@nestjs/swagger";
import { Contains, IsInt, IsNotEmpty, IsString } from "class-validator";

export class UpdateSchoolDto {
    @ApiProperty({
      example: '학교',
      description: '학교를 입력해 주세요'
    })  
    @IsString()
    @IsNotEmpty({message: '학교를 입력해 주세요'})
    // 해당 문자가 있는지 확인
    @Contains('학교', {
      message: `'학교' 단어를 넣어주세요!`
    })
    name: string;
  }