import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsString } from "class-validator";

export class CreateAnimalDto {
    @ApiProperty({
      example: '이름',
      description: '이름을 입력 해 주세요'
    })
    @IsString()
    name: string;

    @ApiProperty({
      example: 10,
      description: '나이를 입력 해 주세요'
    })
    @IsInt()
    age: number;
    
    @ApiProperty({
      example: '사자',
      description: '품종을 입력 해 주세요'
    })
    @IsString()
    breed: string;
  }