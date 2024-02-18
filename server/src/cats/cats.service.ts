import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ApiConfigService } from 'src/app-config/api-config.service';
import { CatEntity } from './cat.entity';
import { Repository } from 'typeorm';
import { CreateCatDto } from './cat.dto';

@Injectable()
export class CatsService {
  constructor(
    private apiConfigService: ApiConfigService,
    @InjectRepository(CatEntity)
    private usersRepository: Repository<CatEntity>,
  ) {}

  async findAll() {
    return this.usersRepository.find();
  }

  async findOne(id: number) {
    return this.usersRepository.findOneBy({ id });
  }

  async remove(id: number) {
    return this.usersRepository.delete(id);
  }

  async create(user: CreateCatDto) {
    this.usersRepository.save([user]);
  }

  async delete(userId: number) {
    this.usersRepository.delete(userId);
  }
}
