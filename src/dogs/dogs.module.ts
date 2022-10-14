import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { DogsController } from './dogs.controller';
import { DogsService } from './dogs.service';
import { dogsRepository } from './repository/dogs.repository';

@Module({
  imports: [DatabaseModule],
  controllers: [DogsController],
  providers: [...dogsRepository, DogsService],
})
export class DogsModule {}
