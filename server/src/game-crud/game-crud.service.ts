import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreatePlayerEntity } from './entity/create-player.entity';
import { Repository } from 'typeorm';
import { CreatePlayerDto } from './dto/create-player.dto';

@Injectable()
export class GameCrudService {
  constructor(@InjectRepository(CreatePlayerEntity) private playerRepository: Repository<CreatePlayerEntity>) {}

  createPlayer(player: CreatePlayerDto) {
    this.playerRepository.save(player);
  }

  getAllPlayers() {
    return this.playerRepository.find();
  }

  deletePlayer(id: string) {
    this.playerRepository.delete({ id });
  }

  findPlayer(id: string) {
    return this.playerRepository.findOneBy({ id });
  }
}

