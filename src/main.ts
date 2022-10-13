import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './exception/all-exceptions.filter';
import { HttpExceptionFilter } from './exception/http-exception.filters';
import { LoggerMiddleware } from './middleware/logger';

async function bootstrap() {
  // NestFactory - 인스턴스를 생성할 수 있는 몇 가지 정적 메서드 노출
  const app = await NestFactory.create(AppModule);
  
  /* 
  글로벌 미들웨어
  app.use(LoggerMiddleware)
  */

  /* 
  
  글로벌 예외 필터
  전역필터에 종속성을 주입하려면 모듈에서 직접 전역 범위 필터를 등록해야 한다.
  
  app.useGlobalFilters(new HttpExceptionFilter());
  
  */

  /* 
  
  처리되지 않은 예외 잡기
  
  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(new AllExceptionsFilter(httpAdapter))
  
  */

  /*
  전역 범위 파이프
  전역 파이프에 종속성을 주입하려면 모듈에서 직접 전역 범위 파이프를 등록해야 한다.

  app.useGlobalPipes(new ValidationPipe());
  */

  /*
  전역 범위 가드
  전역 가드에 종속성을 주입하려면 모듈에서 직접 전역 범위 가드를 등록해야 한다.

  app.useGlobalGuards(new RolesGuard()); 
  */
  await app.listen(3000);
}
bootstrap();
