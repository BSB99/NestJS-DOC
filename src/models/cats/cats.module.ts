import { Module } from '@nestjs/common';
import { CatsController } from './cats.controller';
import { CatsService } from './cats.service';

/*
모든 곳에서 CatsModule이 필요할 때 Global 데코레이터로 전역 모듈로 만든다..
@Global
*/
@Module({
    controllers: [CatsController],
    providers: [CatsService],
    // 다른 모듈에서 CatsService를 참조하려 할 때는 exports 해줘야한다. 
    exports: [CatsService]
})
export class CatsModule {}
