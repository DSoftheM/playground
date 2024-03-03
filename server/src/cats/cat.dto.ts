import { IUser } from '@shared/types/auth/user.interface';
import { ICatCreate } from '@shared/types/cats/cat-create.interface';
import { IsString, IsBoolean, Length, IsNumber } from 'class-validator';

export interface ICat {
  id: string;
  firstName: string;
  lastName: string;
  isActive: boolean;
  master: IUser;
}

export class CreateCatDto implements ICatCreate {
  @IsString()
  @Length(2, 30, { message: 'Длина имени должна быть от 2 до 30 символов' })
  firstName: string;

  @IsString()
  @Length(2, 30, { message: 'Длина фамилии должна быть от 2 до 30 символов' })
  lastName: string;

  @IsBoolean()
  isActive: boolean;

  @IsNumber()
  masterId: number;
}
