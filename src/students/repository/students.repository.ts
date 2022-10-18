import { DataSource } from 'typeorm';
import { Student } from '../entity/Students.entity';

export const studentsRepository = [
  {
    provide: 'STUDENTS_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Student),
    inject: ['DATA_SOURCE'],
  },
];
