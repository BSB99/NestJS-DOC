import { Dogs } from 'src/dogs/entity/dogs.entity';
import { DataSource } from 'typeorm';

export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      const dataSource = new DataSource(
        {
            name: "db_01",  
            type: "mysql",
            host : "127.0.0.1",
            port : 3306,
            username : "root",
            password : "root",
            database : "test_1",
            entities: [Dogs],
            synchronize: false,
        });

      return dataSource.initialize();
    },
  },
];
