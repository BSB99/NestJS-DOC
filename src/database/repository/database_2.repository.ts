import { Animals } from 'src/animals/entity/animal.entity';
import { DataSource } from 'typeorm';

export const databaseTwoProviders = [
    {
      provide: 'DATA_SOURCE',
      useFactory: async () => {
        const dataSource = new DataSource(
          {
              name: "db_02",  
              type: "mysql",
              host : "127.0.0.1",
              port : 3306,
              username : "root",
              password : "root",
              database : "test_2",
              entities: [Animals],
              synchronize: false,
          });
  
        return dataSource.initialize();
      },
    },
  ];