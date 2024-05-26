import { IPlayerCreate } from '@shared/types/game-crud/player-create.interface';
import { IsString, Length } from 'class-validator';
import { IsFile } from 'src/global/decorators/is-file.decorator';

export class CreatePlayerDto implements IPlayerCreate {
  @IsString()
  @Length(4, 40)
  name: string;

  //   @IsFile({ mime: ['image/jpeg', 'image/png', 'image/jpg'] })
  //   avatar: Express.Multer.File;
}
