import { ExecutionContext, createParamDecorator } from "@nestjs/common";
import { Users } from "@prisma/client";

export const  CurrentUser = createParamDecorator(
    (data: keyof Users, ctx: ExecutionContext) => {
        const req = ctx.switchToHttp().getRequest()
        const user = req.user()

        return data ? user[data] : user
    }
)