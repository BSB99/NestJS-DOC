import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException } from '@nestjs/common';
import { validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class ValidationPipe implements PipeTransform<any> {
    //Nest는 동기 || 비동기 파이프를 모두 지원 가능
  async transform(value: any, { metatype }: ArgumentMetadata) {
    //현재 인수가 JS 유형인 경우 검증 필요 X
    if (!metatype || !this.toValidate(metatype)) {
        return value;
    }
    // Body로 넘어온 값 확인
    const object = plainToInstance(metatype, value);
    const errors = await validate(object);
    if (errors.length > 0) {
        throw new BadRequestException('Validation failed');
    }
    return value;
    }

  private toValidate(metatype: Function): boolean {
    const types: Function[] = [String, Boolean, Number, Array, Object];
    return !types.includes(metatype);
  }
}