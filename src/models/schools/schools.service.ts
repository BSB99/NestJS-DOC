import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateSchoolDto } from './dto/create-school.dto';
import { UpdateSchoolDto } from './dto/update-school.dto';
import { School } from './entity/Schools.entity';


@Injectable()
export class SchoolsService {
    constructor(
      @InjectRepository(School, 'testDB_2')
      private schoolsRepository: Repository<School>
      ) {}

      async allSchools(): Promise<School[]> {
        try{
            const schools: School[] = await this.schoolsRepository.find()
            return schools;
        }catch(err){
            throw err;
        }
      }

      async create(createSchoolDto: CreateSchoolDto): Promise<School> {
        try {
          const { name }: CreateSchoolDto = createSchoolDto;

          const school: School = this.schoolsRepository.create({
            name,
          });
          
          await this.schoolsRepository.save(school);
          
          return school;
        } catch(err) {
          throw err;
        }
      }

      async update(no: number, updateSchoolDto: UpdateSchoolDto):Promise<number> {
        try {
          const animal: School = await this.schoolsRepository.findOne({
            where: {
              no,
            },
          });
      
          if (!animal) {
            throw new NotFoundException(1000);
          }
          const {affected} = await this.schoolsRepository.update(no, updateSchoolDto);

          return affected;
        } catch(err) {
          throw err;
        }
      }

      async delete(no: number):Promise<number> {
        try {
          const {affected} = await this.schoolsRepository.delete(no);
          if (!affected) {
            throw new NotFoundException(1000);
          };

          return affected;
        } catch(err) {
          throw err;
        }
      }
}
