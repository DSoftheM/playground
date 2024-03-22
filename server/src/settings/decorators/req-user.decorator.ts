import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { Request } from 'express';
import { UserDTO } from 'src/users/user.dto';

export const ReqUser = createParamDecorator<void, ExecutionContext, UserDTO>((data: void, ctx: ExecutionContext) => {
  return ctx.switchToHttp().getRequest<Request>().user;
});
