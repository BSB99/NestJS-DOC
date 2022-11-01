import { Student } from "src/models/students/entity/Students.entity";
import { User } from "src/models/users/entity/users.entity";

export const testDB_1: any = {
  timezone: "Asia/Seoul",
  name: "testDB_1",  
  type: "mysql",
  host : "127.0.0.1",
  port : 3306,
  username : "root",
  password : "root",
  database : "test_1",
  entities: [Student, User],
  synchronize: true,
}