import { createParamDecorator, ExecutionContext } from "@nestjs/common";

export const Cats = createParamDecorator(
    (data: string, ctx: ExecutionContext) => {
        const request = ctx.switchToHttp().getRequest();
        const cat = request.cat
        return data ? cat?.[data] : cat;
    }
)