import { Body, Controller, Get, Param, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { CreatePlayerDto } from './dto/create-player.dto';
import { SetPublic } from 'src/global/set-public';
import { FileInterceptor } from '@nestjs/platform-express';
import { GameCrudService } from './game-crud.service';
import { DeletePlayerDto } from './dto/delete-player.dto';

@Controller('game-crud')
export class GameCrudController {
  constructor(private gameCrudService: GameCrudService) {}

  @Post('/createPlayer')
  @SetPublic()
  @UseInterceptors(FileInterceptor('avatar'))
  createPlayer(@Body() player: CreatePlayerDto, @UploadedFile() file?: Express.Multer.File) {
    return this.gameCrudService.createPlayer(player);
  }

  @Get('/getAllPlayers')
  @SetPublic()
  getAllPlayers() {
    return this.gameCrudService.getAllPlayers();
  }

  @Post('/deletePlayer')
  deletePlayer(@Body() dto: DeletePlayerDto) {
    this.gameCrudService.deletePlayer(dto.playerId);
  }

  @Get('/getPlayer/:playerId')
  getPlayer(@Param('playerId') playerId: string) {
    return this.gameCrudService.findPlayer(playerId);
  }
}

