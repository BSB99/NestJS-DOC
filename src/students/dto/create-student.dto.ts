import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsNumber, IsString } from "class-validator";

export class CreateStudentDto {
  @ApiProperty({
    example: '학교',
    description: '학교를 입력 해 주세요'
  })
    @IsString()
    name: string;

    @IsNumber()
    age: number;

    @IsNumber()
    school: number;
  }