import { IRegisterUser } from '@shared/types/auth/register-user.interface';
import { IsString } from 'class-validator';

export class RegisterUserDTO implements IRegisterUser {
  @IsString()
  login: string;

  @IsString()
  password: string;
}
