import { Controller, Get } from '@nestjs/common';
import { AnimalsService } from './animals.service';

@Controller('animals')
export class AnimalsController {
    constructor(private animalsService: AnimalsService) {}

    @Get()
    async allAnimals() {
        try {
            const response = await this.animalsService.allAnimals();

            return response;
        } catch(err) {
            throw err;
        }
    }
}
