import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";


@Injectable()
export class RolesGuard implements CanActivate {
  
  constructor(private reflector: Reflector) {}
  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    if (!roles) {
      return false;
    }
    // 클라이언트에서 보낸 request 정보를 읽어온다.
    const request = context.switchToHttp().getRequest();
    
    // node.js에서는 승인된 사용자를 request 객체에 연결하는 것이 일반적
    const user = request.body;
    
    //return matchRoles(roles, user.roles);
    
    // 간단하게 구현한 matchRoles 로직
    // 아직 사용자가 없으므로 body에 user:admin 키 벨류값 생성
    return roles.includes(user.user);
  }
}