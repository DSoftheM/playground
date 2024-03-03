import { IsString } from 'class-validator';

export class EditorTemplateDto {
  @IsString()
  text: string;
}
