import { Body, Controller, Delete, Get, InternalServerErrorException, Param, Patch, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { StudentsService } from './students.service';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';

@ApiTags('students')
@Controller('students')
export class StudentsController {
    constructor(private studentsService: StudentsService) {}

    @ApiOperation({ summary: '학생 전체 조회 API', description: '학생 전체 조회'})
    @Get()
    async allStudents():Promise<object> {
        try {
            const response = await this.studentsService.allStudents();

            return response;
        } catch(err) {
            throw err;
        }
    }

    @ApiOperation({ summary: '학생 정보 생성 API', description: '학생 정보 생성'})
    @Post()
    async create(@Body() createStudentDto: CreateStudentDto) {
        try {
            const response = await this.studentsService.create(createStudentDto);

            if (!response) {
                throw new InternalServerErrorException(1500);
            }
        } catch(err) {
            throw err;
        }
    }

    @ApiOperation({ summary: '학생 정보 수정 API', description: '학생 정보 수정'})
    @Patch(':no')
    async update(@Param('no') no: number, @Body() updateStudentDto: UpdateStudentDto) {
        try {
        const response = await this.studentsService.update(no, updateStudentDto);

        if (!response) {
            throw new InternalServerErrorException(1500);
        }

    } catch (err) {
        throw err;
    }
    }

    @ApiOperation({ summary: '학생 정보 삭제 API', description: '학생 정보 삭제'})
    @Delete(':no')
    async delete(@Param('no') no: number) {
        try {
            const response = await this.studentsService.delete(no);
    
            if (!response) {
                throw new InternalServerErrorException(1500);
            }
    
    } catch (err) {
        throw err;
    }
}


}
