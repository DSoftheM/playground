import { Module } from '@nestjs/common';
import { GameCrudController } from './game-crud.controller';
import { GameCrudService } from './game-crud.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CreatePlayerEntity } from './entity/create-player.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CreatePlayerEntity])],
  controllers: [GameCrudController],
  providers: [GameCrudService],
})
export class GameCrudModule {}

