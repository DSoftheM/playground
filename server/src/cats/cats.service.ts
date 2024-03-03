import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ApiConfigService } from 'src/app-config/api-config.service';
import { CatSchema } from './cat.entity';
import { Repository } from 'typeorm';
import { CreateCatDto, ICat } from './cat.dto';
import { UserSchema } from 'src/users/user.schema';

@Injectable()
export class CatsService {
  constructor(
    private apiConfigService: ApiConfigService,
    @InjectRepository(CatSchema)
    private catsRepository: Repository<ICat>,
    @InjectRepository(UserSchema)
    private usersRepository: Repository<UserSchema>,
  ) {}

  async findAll() {
    return this.catsRepository.find({ relations: { master: true } });
  }

  async findOne(id: string) {
    return this.catsRepository.findOneBy({ id });
  }

  async remove(id: number) {
    return this.catsRepository.delete(id);
  }

  async create(cat: CreateCatDto) {
    const user = await this.usersRepository.findOneBy({ id: cat.masterId });
    if (!user) throw new BadRequestException();
    const createdCat = await this.catsRepository.save({ firstName: cat.firstName, isActive: cat.isActive, lastName: cat.lastName, master: user });
    return createdCat.id;
  }

  async delete(userId: number) {
    this.catsRepository.delete(userId);
  }
}
