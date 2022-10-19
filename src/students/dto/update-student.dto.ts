import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsNumber, IsString } from "class-validator";

export class UpdateStudentDto {
    @ApiProperty({
        example: '학교',
        description: '학교를 입력 해 주세요'
      })  
    @IsString()
    name: string;

    @ApiProperty({
      example: 12,
      description: '나이를 입력 해 주세요'
    })
    @IsNumber()
    age: number;

    @ApiProperty({
      example: 1,
      description: '학교 번호를 입력 해 주세요'
    })
    @IsNumber()
    school: number;
  }