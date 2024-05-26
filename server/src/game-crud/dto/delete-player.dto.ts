import { IsString } from 'class-validator';

export class DeletePlayerDto {
  @IsString()
  playerId: string;
}
