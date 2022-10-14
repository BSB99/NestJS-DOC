import { DataSource } from 'typeorm';
import { Dogs } from '../entity/dogs.entity';

export const dogsRepository = [
  {
    provide: 'DOGS_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Dogs),
    inject: ['DATA_SOURCE'],
  },
];