import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { TestController } from './test.controller';

@Module({
  imports: [ScheduleModule.forRoot()],
  controllers: [TestController]
})
export class TestModule {}
