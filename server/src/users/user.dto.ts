import { IUser } from '@shared/types/auth/user.interface';
import { IsNumber, IsString } from 'class-validator';

export class UserDTO {
  @IsString()
  login: string;

  @IsNumber()
  id: number;
}
