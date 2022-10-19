import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
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

            return {
                success: true,
                response
            };
        } catch(err) {
            throw err;
        }
    }

    @ApiOperation({ summary: '학생 정보 생성 API', description: '학생 정보 생성'})
    @Post()
    async create(@Body() createStudentDto: CreateStudentDto):Promise<object> {
        try {
            const response = await this.studentsService.create(createStudentDto);

            return {success : true};
        } catch(err) {
            throw err;
        }
    }

    @ApiOperation({ summary: '학생 정보 수정 API', description: '학생 정보 수정'})
    @Patch(':no')
    async update(@Param('no') no: number, @Body() updateStudentDto: UpdateStudentDto):Promise<object> {
        try {
        const response = await this.studentsService.update(no, updateStudentDto);

        // if (!response) {
        //     return {success: false};
        // }

        return {success: true};
    } catch (err) {
        throw err;
    }
    }

    @ApiOperation({ summary: '학생 정보 삭제 API', description: '학생 정보 삭제'})
    @Delete(':no')
    async delete(@Param('no') no: number):Promise<object> {
        try {
            const response = await this.studentsService.delete(no);
    
            if (!response) {
                return {success: false};
            }
    
            return {success: true};
    } catch (err) {
        throw err;
    }
}


}
