import { Controller, Get } from '@nestjs/common';
import { DogsService } from './dogs.service';

@Controller('dogs')
export class DogsController {
    constructor(private dogsService: DogsService) {}

    @Get()
    async allDogs() {
    try {
        const response = this.dogsService.allDogs();

        return response;
    }catch(err) {
        throw err;
    }
    }
}
