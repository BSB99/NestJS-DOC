import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsController } from './cats/cats.controller';
import { CatsService } from './cats/cats.service';

@Module({
  imports: [],
  controllers: [AppController, CatsController],
  //Service는 공급자 이므로 파일을 생성한 경우 꼭 providers 안에 넣어줘야 종속성 문제가 발생하지 않는다.
  providers: [AppService, CatsService],
})
export class AppModule {}
