import { IsString } from 'class-validator';
import { ILoginUser } from '@shared/types/auth/login-user.interface';

export class LoginUserDTO implements ILoginUser {
  @IsString()
  login: string;

  @IsString()
  password: string;
}
