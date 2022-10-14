import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { AnimalsController } from './animals.controller';
import { AnimalsService } from './animals.service';
import { animalsRepository } from './repository/animal.repository';

@Module({
  imports: [DatabaseModule],
  controllers: [AnimalsController],
  providers: [...animalsRepository,AnimalsService]
})
export class AnimalsModule {}
