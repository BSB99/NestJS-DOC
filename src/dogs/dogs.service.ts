import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Dogs } from './entity/dogs.entity';

@Injectable()
export class DogsService {
    constructor(
        @Inject('DOGS_REPOSITORY') 
        private readonly dogsRepository: Repository<Dogs>,
      ) {}
    async allDogs() {
        return this.dogsRepository.find();
    }
}
