import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  // NestFactory - 인스턴스를 생성할 수 있는 몇 가지 정적 메서드 노출
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();
