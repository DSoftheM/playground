import { Injectable } from '@nestjs/common';
import { IsString } from 'class-validator';
import { EntitySchema, Repository } from 'typeorm';
import { RegisterUserDTO } from '../auth/dto/register-user.dto';
import { UserSchema } from './user.schema';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(UserSchema) private userRepository: Repository<UserSchema>) {}

  async register(registerUserDTO: RegisterUserDTO) {
    await this.userRepository.save([registerUserDTO]);
  }

  async getUserByLogin(login: string) {
    return this.userRepository.findOneBy({ login });
  }

  async getAllUsers() {
    return this.userRepository.find();
  }
}
