import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsInt, IsNotEmpty, IsNumber, IsString, Length, Matches, MaxLength } from "class-validator";

export class CreateStudentDto {
  @ApiProperty({
    example: '이름',
    description: '이름을 입력 해 주세요'
  })
  @IsString()
  @IsNotEmpty()
  // 1 이상 ~ 8 이하
  @Length(1, 8)
  name: string;

  @ApiProperty({
    example: 12,
    description: '나이를 입력 해 주세요'
  })
  @IsNumber()
  @IsNotEmpty()
  age: number;

  @ApiProperty({
    example: 1,
    description: '학교 번호를 입력 해 주세요'
  })
  @IsNumber()
  school: number;

  @ApiProperty({
    example: "id@email.com",
    description: '이메일을 입력 해 주세요'
  })
  @IsEmail()
  @IsNotEmpty()
  @IsString()
  email: string;

  @ApiProperty({
    example: 'a1234567!',
    description: '비밀번호를 입력 해 주세요'
  })
  @IsString()
  @IsNotEmpty()
  // 최소 하나의 문자, 하나의 숫자 및 하나의 특수문자 , 최소 8자 
  @Matches( /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/,
  {
    message: '비밀번호 양식에 맞춰 작성해 주세요.(최소 하나의 문자, 하나의 숫자, 하나의 특수문자 , 최소 8자)'
  }
  )
  password: string;
  
  @ApiProperty({
    example: 'Hi~',
    description: '한줄 소개를 입력 해 주세요'
  })
  @IsString()
  // 15 이하 까지
  @MaxLength(15, {message: '15자 이하로 작성해 주세요'})
  summary: string;
  }