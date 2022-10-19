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
            const Schools: School[] = await this.schoolsRepository.find()
            return Schools;
        }catch(err){
            throw err;
        }
      }

      async create(createAnimalDto: CreateSchoolDto): Promise<School> {
        try {
          const { name }: CreateSchoolDto = createAnimalDto;

          const animal: School = this.schoolsRepository.create({
            name,
          });
          
          await this.schoolsRepository.save(animal);
        
          return animal;
        } catch(err) {
          throw err;
        }
      }

      async update(no: number, updateAnimalDto: UpdateSchoolDto):Promise<number> {
        try {
          const animal: School = await this.schoolsRepository.findOne({
            where: {
              no,
            },
          });
      
          if (!animal) {
            throw new NotFoundException(`해당 ${no}번 학교의 정보는 존재하지 않습니다.`);
          }
          const {affected} = await this.schoolsRepository.update(no, updateAnimalDto);

          return affected;
        } catch(err) {
          throw err;
        }
      }

      async delete(no: number):Promise<number> {
        try {
          const {affected} = await this.schoolsRepository.delete(no);
          if (!affected) {
            throw new NotFoundException(`해당 ${no}번 학교의 정보는 존재하지 않습니다.`);
          };

          return affected;
        } catch(err) {
          throw err;
        }
      }
}
