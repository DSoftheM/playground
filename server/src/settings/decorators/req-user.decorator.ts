import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { Request } from 'express';
import { CommonUser } from 'src/users/types/common-user';

export const ReqUser = createParamDecorator<void, ExecutionContext, CommonUser>((data: void, ctx: ExecutionContext) => {
  // @ts-ignore
  return ctx.switchToHttp().getRequest<Request>().user;
});
