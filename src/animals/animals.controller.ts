import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AnimalsService } from './animals.service';
import { CreateAnimalDto } from './dto/create-animal.dto';
import { UpdateAnimalDto } from './dto/update-animal.dto';
import { Animals } from './entity/animal.entity';

@ApiTags('animals')
@Controller('animals')
export class AnimalsController {
    constructor(private animalsService: AnimalsService) {}

    @ApiOperation({ summary: '동물 전체 조회 API', description: '동물 전체 조회'})
    @Get()
    async allAnimals(): Promise<object> {
        try {
            const response: Animals[] = await this.animalsService.allAnimals();

            return {
                success: true,
                response
            };
        } catch(err) {
            throw err;
        }
    }

    @ApiOperation({ summary: '동물 정보 생성 API', description: '동물 정보 생성'})
    @Post()
    async create(@Body() createAnimalDto: CreateAnimalDto): Promise<object> {
        try {
            const response: Animals = await this.animalsService.create(createAnimalDto);

            if (!response) {
                return {success: false};
            } 

            return {success: true};
        } catch(err) {
            throw err;
        }
    }

    @ApiOperation({ summary: '동물 정보 수정 API', description: '동물 정보 수정'})
    @Patch(':no')
    async update(@Param('no') no: number, @Body() updateAnimalDto: UpdateAnimalDto): Promise<object> {
        try {
            const response: number = await this.animalsService.update(no, updateAnimalDto);

            if (!response) {
                return {success: false};
            } 

            return {success: true};
        } catch(err) {
            throw err;
        }
    }

    @ApiOperation({ summary: '동물 정보 삭제 API', description: '동물 정보 삭제'})
    @Delete(':no')
    async delete(@Param('no') no: number): Promise<object> {
        try {
            const response: number = await this.animalsService.delete(no);

            if (!response) {
                return {success: false};
            } 

            return {success: true};
        } catch(err) {
            throw err;
        }
    }
}
