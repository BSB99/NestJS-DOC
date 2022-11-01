import { Inject, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { School } from "../entity/Schools.entity";

@Injectable()
export class SchoolsRepository {
    constructor(
        @InjectRepository(School, 'testDB_2')
        private schoolsRepository: Repository<School>,
    ){}

    async allSchools() {
        try{ 
            return await this.schoolsRepository.query(`SELECT students.no, students.name, students.age, schools.name as school FROM test_1.students as students LEFT JOIN test_2.schools as schools ON students.school = schools.no`);
        } catch (err) {
            throw err;
        }
        
    }
}