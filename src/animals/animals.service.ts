import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Animals } from './entity/animal.entity';

@Injectable()
export class AnimalsService {
    constructor(
        @Inject('ANIMALS_REPOSITORY') 
        private readonly animalsRepository: Repository<Animals>,
      ) {}

      async allAnimals() {
        try{
            return this.animalsRepository.find();
        }catch(err){
            throw err;
        }
      }
}
