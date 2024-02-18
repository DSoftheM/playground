import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { RegisterUserDTO } from './dto/register-user.dto';
import { LoginUserDTO } from './dto/login-user.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService, private jwtService: JwtService) {}

  async registerUser(registerUserDTO: RegisterUserDTO) {
    return this.usersService.register(registerUserDTO);
  }

  async loginUser(loginUserDTO: LoginUserDTO) {
    const user = await this.usersService.getUserByLogin(loginUserDTO.login);
    if (!user) {
      throw new BadRequestException('Такого пользователя не существует'); // "Такого пользователя не существует"
    }

    if (user.password !== loginUserDTO.password) {
      throw new BadRequestException('Неправильный пароль');
    }

    const { password, ...restUser } = user;
    const access_token = this.jwtService.sign(restUser);
    // const refresh_token = this.jwtService.sign(restUser, { secret: 'секрет для рефреша' });
    return { access_token };
  }
}
