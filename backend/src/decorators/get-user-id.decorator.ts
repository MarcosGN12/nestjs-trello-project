import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const GetUserId = createParamDecorator(
    (data: string | undefined, ctx: ExecutionContext): number => {
        const request: Record<string, unknown> & { payload: { userId: number } } = ctx.switchToHttp().getRequest();
        return request.payload.userId;
    },
);