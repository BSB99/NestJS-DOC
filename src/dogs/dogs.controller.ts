import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { DogsService } from './dogs.service';
import { CreateDogDto } from './dto/create-dog.dto';

@ApiTags('dogs DB 연동 시 CRUD 및 swagger 작업 진행 예정')
@Controller('dogs')
export class DogsController {
    constructor(private dogsService: DogsService) {}

    @Get()
    async allDogs() {
        try {
            const response = this.dogsService.allDogs();

            return response;
        } catch(err) {
            throw err;
        }
    }

    @Post()
    async create(@Body() createDogDto: CreateDogDto) {
        try {
            const response = this.dogsService.create(createDogDto);

            return {msg : "success"};
        } catch(err) {
            throw err;
        }
    }
}
