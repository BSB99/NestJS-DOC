import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { SchoolsController } from './schools.controller';
import { SchoolsService } from './schools.service';
import { /*SchoolRepository,*/ schoolsRepository } from './repository/schools.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { School } from './entity/Schools.entity';
import { TypeOrmExModule } from 'src/module/typeorm-ex.module';
import { CustomRepository } from 'src/decorators/typeorm-ex.decorators';

@Module({
  imports: [DatabaseModule],
  controllers: [SchoolsController],
  providers: [...schoolsRepository,SchoolsService]
})
export class SchoolsModule {}
