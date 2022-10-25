import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { APP_FILTER, APP_PIPE } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsController } from './cats/cats.controller';
import { CatsModule } from './cats/cats.module';
import { HttpExceptionFilter } from './exception/http-exception.filters';
import { LoggerMiddleware } from './middleware/logger';
import { ValidationPipe } from './pipe/validation.pipe';
import { StudentsModule } from './students/students.module';
import { SchoolsModule } from './schools/schools.module';
import { Student } from './students/entity/Students.entity';
import { DataSource } from 'typeorm';
import { StudentsController } from './students/students.controller';
import { School } from './schools/entity/Schools.entity';
import { UsersModule } from './users/users.module';
import { User } from './users/entity/users.entity';

@Module({
  //Module을 imports 배열안에 넣어주면 해당 Module안에 있는 controller와 providers는 넣어주지 않아도 된다.
  //CatsModule.forRoot([User]) -> CatsModule을 User에서 참조하겠다.
  //.forRoot({isGlobal: true}) -> 전역 모듈로 쓰겠다.
  imports: [
    TypeOrmModule.forRoot({
      timezone: "Asia/Seoul",
      name: "testDB_2",  
      type: "mysql",
      host : "127.0.0.1",
      port : 3306,
      username : "root",
      password : "root",
      database : "test_2",
      entities: [School],
      synchronize: true,
      //autoLoadEntities: true일 경우 entity가 자동 로드
      // autoLoadEntities: true
  }),
  TypeOrmModule.forRoot({
      timezone: "Asia/Seoul",
      name: "testDB_1",  
      type: "mysql",
      host : "127.0.0.1",
      port : 3306,
      username : "root",
      password : "root",
      database : "test_1",
      entities: [Student, User],
      synchronize: true,
      // autoLoadEntities: true
  }),
  StudentsModule,
  SchoolsModule,
  UsersModule,
],
  controllers: [AppController],
  //Service는 공급자 이므로 파일을 생성한 경우 꼭 providers 안에 넣어줘야 종속성 문제가 발생하지 않는다.
  providers: [
    /* 종속성 주입을 위한 전역 범위 필터 등록
    {
      provide: APP_FILTER, 
      useClass: HttpExceptionFilter
    },
    */
   /* 종속성 주입을 위한 전역 범위 파이프 등록
   {
    provide: APP_PIPE,
    useClass: ValidationPipe,
   },
   */
  /* 종속성 주입을 위한 전역 범위 가드 등록
   {
    provide: APP_GUARD,
    useClass: RolesGuard,
   },
   */
    AppService],
})
// @Module에는 미들웨어가 들어가지 못한다. 대신 configure() 메서드를 사용하여 설정
// 미들웨어를 포함하는 모듈은 NestModule 인터페이스를 구현해야한다.
export class AppModule {}

//export class AppModule implements NestModule{
 //configure(consumer: MiddlewareConsumer) {
  // consumer
  // .apply(LoggerMiddleware)
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
 //  .forRoutes(CatsController);
// }
//}
//.forRoutes('cats') -> /cats 경로로 요청이 들어왔을 때만 미들웨어 적용
//.forRoutes({pathL 'cats', method: RequestMethod.GET}) -> 경로가 /cats 이고 GET 요청일 때만 미들웨어 적용
