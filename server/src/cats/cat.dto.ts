import { IsString, IsBoolean, Length } from 'class-validator';

export class CreateCatDto {
  @IsString()
  @Length(2, 30, { message: 'Длина имени должна быть от 2 до 30 символов' })
  firstName: string;

  @IsString()
  @Length(2, 30, { message: 'Длина фамилии должна быть от 2 до 30 символов' })
  lastName: string;

  @IsBoolean()
  isActive: boolean;
}
