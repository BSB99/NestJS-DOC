import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CreateDogDto } from './dto/create-dog.dto';
import { Dogs } from './entity/dogs.entity';

@Injectable()
export class DogsService {
    constructor(
        @Inject('DOGS_REPOSITORY') 
        private readonly dogsRepository: Repository<Dogs>,
      ) {}

    async allDogs() {
        try {
            return this.dogsRepository.find();
        } catch(err) {
            throw err;
        }
    }

    async create(createDogDto:CreateDogDto): Promise<Dogs> {
        try {
            const {name, age, breed} = createDogDto;
            const dog = await this.dogsRepository.create({name, age, breed});
            console.log(dog);
            await this.dogsRepository.save(dog);
            return dog;
        } catch(err) {
            throw err;
        }
    }
}
