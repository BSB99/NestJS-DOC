import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { Student } from './entity/Students.entity';

@Injectable()
export class StudentsService {
    constructor(
        @Inject('STUDENTS_REPOSITORY') 
        private readonly studentsRepository: Repository<Student>,
      ) {}
    
    async allStudents() {
        try {
            
            return await this.studentsRepository.find();
        } catch(err) {
            throw err;
        }
    }

    async create(createStudentDto:CreateStudentDto): Promise<Student> {
        try {
            const {name, age, school} = createStudentDto;
            const dog = await this.studentsRepository.create({name, age, school});
            
            await this.studentsRepository.save(dog);
            return dog;
        } catch(err) {
            throw err;
        }
    }

    async update(no: number, updateStudentDto: UpdateStudentDto) {
        try {
            const dog: Student = await this.studentsRepository.findOne({
            where: {
            no,
            },
        });

        if (!dog) {
            throw new NotFoundException(`해당 ${no}번 학생의 정보는 존재하지 않습니다.`);
        }
        const {affected} = await this.studentsRepository.update(no, updateStudentDto);

        return affected;
        } catch(err) {
            throw err;
        }
    }

    async delete(no: number) {
        try {
        const {affected} = await this.studentsRepository.delete(no);
        
        if (!affected) {
            throw new NotFoundException(`해당하는 ${no}번 학생의 정보는 존재하지 않습니다.`);
        };

        return affected;
        } catch (err) {
            throw err;
        }
    }
}
