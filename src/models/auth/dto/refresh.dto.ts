import { PickType } from "@nestjs/swagger";
import { SignUpDto } from "src/models/users/dto/sign-up.dto";

export class RefreshDto extends PickType(SignUpDto, ['email']) {}