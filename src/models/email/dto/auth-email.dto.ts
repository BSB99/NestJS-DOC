import { PickType } from "@nestjs/swagger";
import { SignUpDto } from "src/models/users/dto/sign-up.dto";

export class AuthEmailDto extends PickType(SignUpDto, ['email']) {
    
}