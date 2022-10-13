// @Body 데코레이터를 사용하기 전에 DTO 스키마 생성
export class CreateCatDto {
    name: string;
    age: number;
    breed: string;
  }