import { DataSource } from "typeorm";
import { Animals } from "../entity/animal.entity";

export const animalsRepository = [
    {
      provide: 'ANIMALS_REPOSITORY',
      useFactory: (dataSource: DataSource) => dataSource.getRepository(Animals),
      inject: ['DATA_SOURCE'],
    },
  ];