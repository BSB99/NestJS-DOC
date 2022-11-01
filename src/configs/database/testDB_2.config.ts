import { School } from "src/models/schools/entity/Schools.entity";

export const testDB_2: any = {
      timezone: "Asia/Seoul",
      name: "testDB_2",  
      type: "mysql",
      host : "127.0.0.1",
      port : 3306,
      username : "root",
      password : "root",
      database : "test_2",
      entities: [School],
      synchronize: true,
}