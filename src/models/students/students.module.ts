import { Module } from '@nestjs/common';
import { StudentsController } from './students.controller';
import { StudentsService } from './students.service';
import { StudentsRepository } from './repository/students.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Student } from './entity/Students.entity';

@Module({
  // DB에 있는 테이블에 접근 시 해당 Entity와 DB명을 써주어야 한다.
  imports: [TypeOrmModule.forFeature([Student], 'testDB_1')],
  controllers: [StudentsController],
  providers: [StudentsService, StudentsRepository],
})
export class StudentsModule {}
