import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { StudentsController } from './students.controller';
import { StudentsService } from './students.service';
import { studentsRepository } from './repository/students.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Student } from './entity/Students.entity';

@Module({
  imports: [DatabaseModule],
  controllers: [StudentsController],
  providers: [...studentsRepository, StudentsService],
})
export class DogsModule {}
