import { IsNumber, IsString } from 'class-validator';

export class UserDTO {
  @IsString()
  login: string;

  @IsNumber()
  id: number;

  url: string;
}
