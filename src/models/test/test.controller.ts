import { Controller } from '@nestjs/common';
import { Cron, SchedulerRegistry } from '@nestjs/schedule';
import { Interval, Timeout } from '@nestjs/schedule/dist';

@Controller('test')
export class TestController {
    constructor(
        private schedulerRegistry: SchedulerRegistry
    ){}

    @Cron('* * * * * *', {
        name: 'notifications',
      })
      triggerNotifications() {
        console.log("실행중...")
      }

    @Cron('10 * * * * *')
    stopCron() {
        const job = this.schedulerRegistry.getCronJob('notifications');

        job.stop();
        console.log("실행 중지");
    }

    @Cron('50 * * * * *')
    startCron() {
        const job = this.schedulerRegistry.getCronJob('notifications');

        job.start();
        console.log("실행 다시 시작");
    }

    @Cron('40 * * * * *')
    deleteCron() {
        // notifications을 삭제하면 재 실행이 안된다.
        this.schedulerRegistry.deleteCronJob('notifications');

        console.log("실행 삭제");   
    }

    @Interval(3000)
    handleInterval() {
        console.log("3초마다 실행");   
    }

    @Timeout(5000)
    handleTimeout() {
        console.log("5초뒤에 실행");
    }
}
