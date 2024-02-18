import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { SetPublicKey } from './set-public';

@Injectable()
export class JwtGuard implements CanActivate {
  constructor(private jwtService: JwtService, private reflector: Reflector) {}

  public async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.get<boolean>(SetPublicKey, context.getHandler());
    if (isPublic) return true;
    const req = context.switchToHttp().getRequest<Request>();
    const jwtToken = req.headers.authorization ?? '';
    const user = await this.getUserFromJwt(jwtToken);
    if (!user) return false;
    const { iat, exp, ...restUser } = user;
    // @ts-ignore
    req.user = restUser;
    return true;
  }

  private async getUserFromJwt(token: string) {
    const [bearer, jwt] = token.split(' ');
    if (!jwt || bearer !== 'Bearer') return false;
    try {
      return await this.jwtService.verifyAsync(jwt);
    } catch (error) {
      return null;
    }
  }
}
