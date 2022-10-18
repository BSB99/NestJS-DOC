import { School } from 'src/schools/entity/Schools.entity';
import { Student } from 'src/students/entity/Students.entity';
import { DataSource } from 'typeorm';

export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      const dataSource = new DataSource(
        {
          name: "testDB_1",  
          type: "mysql",
          host : "127.0.0.1",
          port : 3306,
          username : "root",
          password : "root",
          database : "test_1",
          entities: [Student],
          synchronize: true,
      });
      return await dataSource.initialize();
    },
  },
];

export const databaseTwoProviders = [
  {
      provide: 'DATA2_SOURCE',
      useFactory: async () => {
          const dataSource = new DataSource(
          {
              name: "testDB_2",  
              type: "mysql",
              host : "127.0.0.1",
              port : 3306,
              username : "root",
              password : "root",
              database : "test_2",
              entities: [School],
              synchronize: true,
          });
      
          return await dataSource.initialize();
      },
      },
  ];