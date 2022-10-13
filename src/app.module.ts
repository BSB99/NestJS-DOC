import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsController } from './cats/cats.controller';
import { CatsModule } from './cats/cats.module';
import { LoggerMiddleware } from './middleware/logger';

@Module({
  //Module을 imports 배열안에 넣어주면 해당 Module안에 있는 controller와 providers는 넣어주지 않아도 된다.
  //CatsModule.forRoot([User]) -> CatsModule을 User에서 참조하겠다.
  //.forRoot({isGlobal: true}) -> 전역 모듈로 쓰겠다.
  imports: [CatsModule],
  controllers: [AppController],
  //Service는 공급자 이므로 파일을 생성한 경우 꼭 providers 안에 넣어줘야 종속성 문제가 발생하지 않는다.
  providers: [AppService],
})

// @Module에는 미들웨어가 들어가지 못한다. 대신 configure() 메서드를 사용하여 설정
// 미들웨어를 포함하는 모듈은 NestModule 인터페이스를 구현해야한다.
export class AppModule implements NestModule{
  configure(consumer: MiddlewareConsumer) {
    consumer
    .apply(LoggerMiddleware)
    /*
    다중 미들웨어 바인딩
    .apply(cors(), helmet(), logger)

    exclude() -> 경로 제외
    .exclude(
      { path: 'cats', method: RequestMethod.GET },
      { path: 'cats', method: RequestMethod.POST },
      'cats/(.*)',
    )
    */
    .forRoutes(CatsController);
  }
}
//.forRoutes('cats') -> /cats 경로로 요청이 들어왔을 때만 미들웨어 적용
//.forRoutes({pathL 'cats', method: RequestMethod.GET}) -> 경로가 /cats 이고 GET 요청일 때만 미들웨어 적용
