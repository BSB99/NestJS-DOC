import {  Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StudentsModule } from './models/students/students.module';
import { SchoolsModule } from './models/schools/schools.module';
import { UsersModule } from './models/users/users.module';
import { AuthModule } from './models/auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { Student } from './models/students/entity/Students.entity';
import { User } from './models/users/entity/users.entity';
import { School } from './models/schools/entity/Schools.entity';
import { EmailModule } from './models/email/email.module';
import { AuthEmail } from './models/email/entity/email.entity';
import { DataSource } from 'typeorm';
import { TestModule } from './models/test/test.module';

@Module({
  //Module을 imports 배열안에 넣어주면 해당 Module안에 있는 controller와 providers는 넣어주지 않아도 된다.
  //CatsModule.forRoot([User]) -> CatsModule을 User에서 참조하겠다.
  //.forRoot({isGlobal: true}) -> 전역 모듈로 쓰겠다.
  imports: [
  ConfigModule.forRoot({ 
    isGlobal: true,
    envFilePath: process.env.NODE_ENV === "production" ? ".env.production" : ".env.development",
  }),

  TypeOrmModule.forRoot({
    timezone: "Asia/Seoul",
    name: process.env.TESTDB_1_NAME,  
    type: "mysql",
    host : process.env.TESTDB_1_HOST,
    port : +process.env.TESTDB_1_PORT,
    username : process.env.TESTDB_1_USERNAME,
    password : process.env.TESTDB_1_PSWORD,
    database : process.env.TESTDB_1_DATABASE,
    entities: [Student, User, AuthEmail],
    synchronize: Boolean(process.env.TESTDB_1_SYNCHRONIZE),
  }),
  TypeOrmModule.forRoot({
    timezone: "Asia/Seoul",
    name: process.env.TESTDB_2_NAME,  
    type: "mysql",
    host : process.env.TESTDB_2_HOST,
    port : +process.env.TESTDB_2_PORT,
    username : process.env.TESTDB_2_USERNAME,
    password : process.env.TESTDB_2_PSWORD,
    database : process.env.TESTDB_2_DATABASE,
    entities: [School],
    synchronize: Boolean(process.env.TESTDB_2_SYNCHRONIZE),
  }),
  StudentsModule,
  SchoolsModule,
  UsersModule,
  AuthModule,
  EmailModule,
  TestModule
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
export class AppModule {
}

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
