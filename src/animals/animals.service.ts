import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CreateAnimalDto } from './dto/create-animal.dto';
import { UpdateAnimalDto } from './dto/update-animal.dto';
import { Animals } from './entity/animal.entity';

@Injectable()
export class AnimalsService {
    constructor(
        @Inject('ANIMALS_REPOSITORY') 
        private readonly animalsRepository: Repository<Animals>,
      ) {}

      async allAnimals(): Promise<Animals[]> {
        try{
            const animals: Animals[] = await this.animalsRepository.find();

            return animals;
        }catch(err){
            throw err;
        }
      }

      async create(createAnimalDto: CreateAnimalDto): Promise<Animals> {
        try {
          const { name, age, breed }: CreateAnimalDto = createAnimalDto;

          const animal: Animals = this.animalsRepository.create({
            name,
            age,
            breed
          });
          
          await this.animalsRepository.save(animal);
        
          return animal;
        } catch(err) {
          throw err;
        }
      }

      async update(no: number, updateAnimalDto: UpdateAnimalDto):Promise<number> {
        try {
          const animal: Animals = await this.animalsRepository.findOne({
            where: {
              no,
            },
          });
      
          if (!animal) {
            throw new NotFoundException(`해당 ${no}번 동물의 정보는 존재하지 않습니다.`);
          }
          const {affected} = await this.animalsRepository.update(no, updateAnimalDto);

          return affected;
        } catch(err) {
          throw err;
        }
      }

      async delete(no: number):Promise<number> {
        try {
          const {affected} = await this.animalsRepository.delete(no);
          if (!affected) {
            throw new NotFoundException(`해당하는 ${no}번 동물의 정보는 존재하지 않습니다.`);
          };

          return affected;
        } catch(err) {
          throw err;
        }
      }
}
