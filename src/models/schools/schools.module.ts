import { Module } from '@nestjs/common';
import { SchoolsController } from './schools.controller';
import { SchoolsService } from './schools.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { School } from './entity/Schools.entity';

@Module({
  imports: [TypeOrmModule.forFeature([School], 'testDB_2')],
  controllers: [SchoolsController],
  providers: [SchoolsService]
})
export class SchoolsModule {}
