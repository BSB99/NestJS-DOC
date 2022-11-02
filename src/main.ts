import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { HttpErrorExceptionFilter } from './common/exception/error.filter';
import { TransformInterceptor } from './common/interceptor/transform';
import { BaseApiDocument } from './common/swagger/swagger.document';

async function bootstrap() {
  // NestFactory - 인스턴스를 생성할 수 있는 몇 가지 정적 메서드 노출
  const app = await NestFactory.create(AppModule);
  
  const config = new BaseApiDocument().initializeOptions();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  //DTO를 쓰기위한 global pipe 지정
  app.useGlobalPipes(
    new ValidationPipe({
      // 엔티티 데코에 없는 프로퍼티 값 거름
      whitelist: true,
      // 엔티티 데코에 없는 값 기입 시 그 값에 대한 에러메시지 표출
      forbidNonWhitelisted: true,
      // 컨트롤러가 값을 받을 때, 컨트롤러에 정의한 타입으로 형변환
      transform: true,
    }),
  );
  /* 
  글로벌 미들웨어
  app.use(LoggerMiddleware)
  */
  
  app.useGlobalInterceptors(new TransformInterceptor());
  app.useGlobalFilters(new HttpErrorExceptionFilter());
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
