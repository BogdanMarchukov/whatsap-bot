import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { ActionRequest } from '../middlewares/create-actions.middleware';

export const RequestAction = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest<ActionRequest>();
    return request.action;
  },
);
