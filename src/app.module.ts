import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsModule } from './cats/cats.module';

@Module({
  //Module을 imports 배열안에 넣어주면 해당 Module안에 있는 controller와 providers는 넣어주지 않아도 된다.
  //CatsModule.forRoot([User]) -> CatsModule을 User에서 참조하겠다.
  //.forRoot({isGlobal: true}) -> 전역 모듈로 쓰겠다.
  imports: [CatsModule],
  controllers: [AppController],
  //Service는 공급자 이므로 파일을 생성한 경우 꼭 providers 안에 넣어줘야 종속성 문제가 발생하지 않는다.
  providers: [AppService],
})
export class AppModule {}
