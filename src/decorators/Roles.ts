import { SetMetadata } from "@nestjs/common";
//Roles 데코레이터 만들기

export const Roles = (...roles: string[]) => SetMetadata('roles', roles);