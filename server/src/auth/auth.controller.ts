import { Body, Controller, Post, Res } from '@nestjs/common';
import { RegisterUserDTO } from './dto/register-user.dto';
import { UsersService } from '../users/users.service';
import { LoginUserDTO } from './dto/login-user.dto';
import { AuthService } from './auth.service';
import { SetPublic } from 'src/global/set-public';
import { Response } from 'express';
import { LoginResponse } from '@shared/types/auth/login-response';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/register')
  @SetPublic()
  registerUser(@Body() registerUserDTO: RegisterUserDTO) {
    this.authService.registerUser(registerUserDTO);
  }

  @Post('/login')
  @SetPublic()
  async loginUser(@Body() loginUserDTO: LoginUserDTO, @Res() res: Response): Promise<LoginResponse> {
    // const { access_token } = await this.authService.loginUser(loginUserDTO);
    // res.setHeader('Set-Cookie', createCookie('access_token', access_token, { HttpOnly: true, expires: new Date(Date.now() + 60 * 10 * 1000) })).end();
    // // return { access_token };
    return {};
  }
}
type Options = {
  expires?: Date | string;
  path?: string;
  Secure?: boolean;
  HttpOnly?: boolean;
  'max-age'?: number;
};
function createCookie(name: string, value: string, options: Options) {
  if (options.expires instanceof Date) {
    options.expires = options.expires.toUTCString();
  }

  let updatedCookie = encodeURIComponent(name) + '=' + encodeURIComponent(value);

  for (const optionKey in options) {
    updatedCookie += '; ' + optionKey;
    const optionValue = options[optionKey as keyof Options];
    if (optionValue !== true) {
      updatedCookie += '=' + optionValue;
    }
  }
  console.log('updatedCookie :>> ', updatedCookie);
  return updatedCookie;
}