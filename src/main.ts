import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { LoggerMiddleware } from './middleware/logger';

async function bootstrap() {
  // NestFactory - 인스턴스를 생성할 수 있는 몇 가지 정적 메서드 노출
  const app = await NestFactory.create(AppModule);
  
  /* 
  글로벌 미들웨어
  app.use(LoggerMiddleware)
  */
 
  await app.listen(3000);
}
bootstrap();
