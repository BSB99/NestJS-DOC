import { Inject, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Student } from "../entity/Students.entity";

@Injectable()
export class StudentsRepository {
    constructor(
        @InjectRepository(Student, 'testDB_1')
        private studentRepository: Repository<Student>,
    ){}

    async allStudents() {
        try{ 
            return await this.studentRepository.query(`
            SELECT student.no, student.name, student.age, schools.name as school 
            FROM 
            test_1.students as student 
            LEFT JOIN 
            test_2.schools as schools 
            ON 
            student.school = schools.no`);
        } catch (err) {
            throw err;
        }
        
    }
}   