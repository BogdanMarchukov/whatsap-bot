import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { RequestUser } from '../middlewares/request-user.middleware';

export const RequestUserDecorator = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest<RequestUser>();
    return request.userBot;
  },
);
